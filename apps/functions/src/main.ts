/**
 * Firebase Functions (v1)
 *
 * All functions are configured with maxInstances in their respective files
 * using functions.runWith({ maxInstances: 10 }) for cost control
 */

// Export Udemy sync functions
export * from './udemy/sync-udemy-stats.function';

// Export YouTube sync functions
export * from './youtube/sync-youtube-stats.function';
