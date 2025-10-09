import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions/v1';
import { YouTubeService } from './youtube.service';

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

/**
 * Syncs YouTube channel stats to Firebase Remote Config
 * Runs daily at 3 AM UTC
 */
export const syncYouTubeStatsScheduled = functions
  .runWith({ memory: '256MB' })
  .pubsub.schedule('every day 03:00')
  .timeZone('UTC')
  .onRun(async _context => {
    functions.logger.info('Starting scheduled YouTube stats sync');
    await syncYouTubeStats();
  });

/**
 * Manual trigger to sync YouTube stats
 * Can be called from frontend or Firebase Console
 */
export const syncYouTubeStatsManual = functions
  .runWith({ memory: '256MB' })
  .https.onCall(async (_data, _context) => {
    functions.logger.info('Starting manual YouTube stats sync');
    try {
      const result = await syncYouTubeStats();
      return { success: true, data: result };
    } catch (error) {
      functions.logger.error('Error syncing YouTube stats', error);
      throw new functions.https.HttpsError('internal', 'Failed to sync YouTube stats');
    }
  });

async function syncYouTubeStats() {
  try {
    // Initialize YouTube service
    const youtubeService = await YouTubeService.create();

    // Fetch stats from YouTube
    functions.logger.info('Fetching YouTube channel stats');
    const stats = await youtubeService.getCompleteStats();

    functions.logger.info('YouTube stats fetched', {
      subscribers: stats.subscriberCount,
      views: stats.totalViews,
      videos: stats.videoCount,
    });

    // Update Remote Config
    const remoteConfig = admin.remoteConfig();
    const template = await remoteConfig.getTemplate();

    // Format numbers for display (e.g., "240" or "10.9k")
    const formatNumber = (num: string): string => {
      const value = parseInt(num);
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}k`;
      }
      return value.toString();
    };

    // Calculate watch hours (assuming average video duration and engagement)
    // This is an approximation - YouTube API doesn't provide watch time
    const estimatedWatchHours = Math.round((parseInt(stats.totalViews) * 0.05) / 60); // ~5% avg duration, convert to hours

    // Update individual parameters
    const updates: Record<string, string> = {
      youtube_subscribers: stats.subscriberCount,
      youtube_views: formatNumber(stats.totalViews),
      youtube_watch_hours: formatNumber(estimatedWatchHours.toString()),
    };

    // Store full stats as JSON for advanced usage
    const youtubeFullStats = {
      lastUpdated: new Date().toISOString(),
      stats,
    };

    // Update parameters
    for (const [key, value] of Object.entries(updates)) {
      if (template.parameters[key]) {
        template.parameters[key].defaultValue = { value };
        functions.logger.info(`Updated ${key} to ${value}`);
      }
    }

    // Add full stats JSON (optional - use only if needed)
    template.parameters['youtube_full_stats'] = {
      defaultValue: {
        value: JSON.stringify(youtubeFullStats),
      },
      description:
        'Complete YouTube channel statistics including recent videos and detailed metrics (JSON format). Auto-updated daily.',
    };

    // Validate and publish template
    const validatedTemplate = await remoteConfig.validateTemplate(template);
    await remoteConfig.publishTemplate(validatedTemplate);

    functions.logger.info('Remote Config updated successfully');

    return {
      success: true,
      updates,
      fullStatsSize: JSON.stringify(youtubeFullStats).length,
    };
  } catch (error) {
    functions.logger.error('Error in syncYouTubeStats', error);
    throw error;
  }
}
