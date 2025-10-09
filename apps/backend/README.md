# Stats API

A simple Node.js Express API that provides YouTube and Udemy statistics
endpoints.

## Prerequisites

- Node.js 22+
- Environment variables set in `.env` file:
  - `YOUTUBE_API_KEY` - YouTube Data API v3 key
  - `UDEMY_API_TOKEN` - Udemy Instructor API token

## Setup

1. Make sure you have a `.env` file in `apps/backend/` with the required API
   keys:

```env
YOUTUBE_API_KEY=your_youtube_api_key
UDEMY_API_TOKEN=your_udemy_api_token
```

2. Install dependencies (if not already installed):

```bash
npm install
```

## Running the Server

### Using Nx

```bash
nx serve backend
```

### Using npm directly

```bash
cd apps/backend
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check

- **GET** `/`
- Returns: `{ status: 'ok', message: 'Stats API is running' }`

### YouTube Stats

- **GET** `/api/youtube/stats`
- Returns YouTube channel statistics including:
  - Subscriber count
  - Video views (formatted)
  - Estimated watch hours
  - Video count
  - Channel title
  - Recent videos (last 5)

Example response:

```json
{
  "success": true,
  "data": {
    "subscribers": "985",
    "views": "57.2k",
    "watchHours": "48",
    "videoCount": "84",
    "channelTitle": "unboxedjs",
    "recentVideos": [...]
  },
  "timestamp": "2025-10-09T11:47:04.731Z"
}
```

### Udemy Stats

- **GET** `/api/udemy/stats`
- Returns Udemy instructor statistics including:
  - Total students
  - Average rating
  - Total reviews
  - Published courses count
  - List of courses
  - Top reviews

Example response:

```json
{
  "success": true,
  "data": {
    "totalStudents": 0,
    "averageRating": "3.8",
    "totalReviews": 100,
    "publishedCourses": 2,
    "courses": [...],
    "topReviews": [...]
  },
  "timestamp": "2025-10-09T11:47:10.434Z"
}
```

## Testing

You can test the endpoints using curl:

```bash
# Test YouTube stats
curl http://localhost:3000/api/youtube/stats

# Test Udemy stats
curl http://localhost:3000/api/udemy/stats
```

## Environment Configuration

You can customize the port by setting the `PORT` environment variable (defaults
to 3000):

```env
PORT=5000
```
