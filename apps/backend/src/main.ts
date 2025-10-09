import express from 'express';
import dotenv from 'dotenv';
import { YouTubeService } from './youtube/youtube.service';
import { UdemyService } from './udemy/udemy.service';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Stats API is running' });
});

// YouTube stats endpoint
app.get('/api/youtube/stats', async (_req, res) => {
  try {
    console.log('Fetching YouTube stats...');
    const youtubeService = await YouTubeService.create();
    const stats = await youtubeService.getCompleteStats();

    // Format numbers for display
    const formatNumber = (num: string): string => {
      const value = parseInt(num);
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}k`;
      }
      return value.toString();
    };

    // Calculate estimated watch hours
    const estimatedWatchHours = Math.round((parseInt(stats.totalViews) * 0.05) / 60);

    const response = {
      success: true,
      data: {
        subscribers: stats.subscriberCount,
        views: formatNumber(stats.totalViews),
        watchHours: formatNumber(estimatedWatchHours.toString()),
        videoCount: stats.videoCount,
        channelTitle: stats.channelTitle,
        recentVideos: stats.recentVideos,
      },
      timestamp: new Date().toISOString(),
    };

    console.log('YouTube stats fetched successfully');
    res.json(response);
  } catch (error) {
    console.error('Error fetching YouTube stats:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Udemy stats endpoint
app.get('/api/udemy/stats', async (_req, res) => {
  try {
    console.log('Fetching Udemy stats...');
    const udemyService = await UdemyService.create();
    const stats = await udemyService.getInstructorStats();

    const response = {
      success: true,
      data: {
        totalStudents: stats.totalStudents,
        averageRating: stats.averageRating.toFixed(1),
        totalReviews: stats.totalReviews,
        publishedCourses: stats.publishedCourses,
        courses: stats.courses,
        topReviews: stats.topReviews,
      },
      timestamp: new Date().toISOString(),
    };

    console.log('Udemy stats fetched successfully');
    res.json(response);
  } catch (error) {
    console.error('Error fetching Udemy stats:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`YouTube stats: http://localhost:${PORT}/api/youtube/stats`);
  console.log(`Udemy stats: http://localhost:${PORT}/api/udemy/stats`);
});
