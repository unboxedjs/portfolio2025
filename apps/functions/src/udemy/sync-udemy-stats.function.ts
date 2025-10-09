import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions/v1';
import { UdemyService } from './udemy.service';

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

/**
 * Syncs Udemy instructor stats to Firebase Remote Config
 * Runs weekly on Monday at 2 AM UTC
 */
export const syncUdemyStatsScheduled = functions
  .runWith({ memory: '256MB' })
  .pubsub.schedule('every monday 02:00')
  .timeZone('UTC')
  .onRun(async _context => {
    functions.logger.info('Starting scheduled Udemy stats sync');
    await syncUdemyStats();
  });

/**
 * Manual trigger to sync Udemy stats
 * Can be called from frontend or Firebase Console
 */
export const syncUdemyStatsManual = functions
  .runWith({ memory: '256MB' })
  .https.onCall(async (_data, _context) => {
    // Optional: Add authentication check
    // if (!context.auth) {
    //   throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    // }

    functions.logger.info('Starting manual Udemy stats sync');
    try {
      const result = await syncUdemyStats();
      return { success: true, data: result };
    } catch (error) {
      functions.logger.error('Error syncing Udemy stats', error);
      throw new functions.https.HttpsError('internal', 'Failed to sync Udemy stats');
    }
  });

async function syncUdemyStats() {
  try {
    // Initialize Udemy service
    const udemyService = await UdemyService.create();

    // Fetch stats from Udemy
    functions.logger.info('Fetching Udemy instructor stats');
    const stats = await udemyService.getInstructorStats();

    functions.logger.info('Udemy stats fetched', {
      courses: stats.totalCourses,
      reviews: stats.totalReviews,
      rating: stats.averageRating,
    });

    // Update Remote Config
    const remoteConfig = admin.remoteConfig();
    const template = await remoteConfig.getTemplate();

    // Update individual parameters
    const updates: Record<string, string> = {
      udemy_students: stats.totalStudents.toString(),
      udemy_rating: stats.averageRating.toFixed(1),
      udemy_reviews: stats.totalReviews.toString(),
      stats_udemy_courses: stats.publishedCourses.toString(),
    };

    // Store full stats as JSON for advanced usage
    const udemyFullStats = {
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
    template.parameters['udemy_full_stats'] = {
      defaultValue: {
        value: JSON.stringify(udemyFullStats),
      },
      description: 'Complete Udemy instructor statistics (JSON)',
    };

    // Validate and publish template
    const validatedTemplate = await remoteConfig.validateTemplate(template);
    await remoteConfig.publishTemplate(validatedTemplate);

    functions.logger.info('Remote Config updated successfully');

    return {
      success: true,
      updates,
      fullStatsSize: JSON.stringify(udemyFullStats).length,
    };
  } catch (error) {
    functions.logger.error('Error in syncUdemyStats', error);
    throw error;
  }
}
