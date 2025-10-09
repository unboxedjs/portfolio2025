const YOUTUBE_CHANNEL_ID = 'UCob_lLtu_hj80nHduNzzQiw';

export interface YouTubeChannelStats {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
  hiddenSubscriberCount: boolean;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  thumbnailUrl: string;
}

export interface YouTubeStats {
  channelId: string;
  channelTitle: string;
  subscriberCount: string;
  totalViews: string;
  videoCount: string;
  recentVideos: YouTubeVideo[];
}

export class YouTubeService {
  private readonly baseUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private apiKey: string, private channelId: string) {}

  private async fetch<T>(endpoint: string, params: Record<string, string>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.searchParams.append('key', this.apiKey);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString());

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`YouTube API error: ${response.status} - ${JSON.stringify(error)}`);
    }

    return response.json();
  }

  async getChannelStats(): Promise<YouTubeChannelStats> {
    const data = await this.fetch<{
      items: Array<{
        statistics: YouTubeChannelStats;
      }>;
    }>('/channels', {
      part: 'statistics',
      id: this.channelId,
    });

    if (!data.items || data.items.length === 0) {
      throw new Error('Channel not found');
    }

    return data.items[0].statistics;
  }

  async getChannelInfo(): Promise<{ title: string }> {
    const data = await this.fetch<{
      items: Array<{
        snippet: {
          title: string;
        };
      }>;
    }>('/channels', {
      part: 'snippet',
      id: this.channelId,
    });

    if (!data.items || data.items.length === 0) {
      throw new Error('Channel not found');
    }

    return { title: data.items[0].snippet.title };
  }

  async getRecentVideos(maxResults = 5): Promise<YouTubeVideo[]> {
    // First, get recent video IDs from the channel
    const searchData = await this.fetch<{
      items: Array<{
        id: { videoId: string };
        snippet: {
          title: string;
          publishedAt: string;
          thumbnails: {
            medium: { url: string };
          };
        };
      }>;
    }>('/search', {
      part: 'snippet',
      channelId: this.channelId,
      type: 'video',
      order: 'date',
      maxResults: maxResults.toString(),
    });

    if (!searchData.items || searchData.items.length === 0) {
      return [];
    }

    // Get video statistics
    const videoIds = searchData.items.map(item => item.id.videoId).join(',');
    const statsData = await this.fetch<{
      items: Array<{
        id: string;
        statistics: {
          viewCount: string;
          likeCount: string;
          commentCount: string;
        };
      }>;
    }>('/videos', {
      part: 'statistics',
      id: videoIds,
    });

    // Combine snippet and statistics
    return searchData.items.map((item, index) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
      viewCount: statsData.items[index]?.statistics.viewCount || '0',
      likeCount: statsData.items[index]?.statistics.likeCount || '0',
      commentCount: statsData.items[index]?.statistics.commentCount || '0',
      thumbnailUrl: item.snippet.thumbnails.medium.url,
    }));
  }

  async getCompleteStats(): Promise<YouTubeStats> {
    const [channelInfo, channelStats, recentVideos] = await Promise.all([
      this.getChannelInfo(),
      this.getChannelStats(),
      this.getRecentVideos(5),
    ]);

    return {
      channelId: this.channelId,
      channelTitle: channelInfo.title,
      subscriberCount: channelStats.subscriberCount,
      totalViews: channelStats.viewCount,
      videoCount: channelStats.videoCount,
      recentVideos,
    };
  }

  static async create(): Promise<YouTubeService> {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      throw new Error('YOUTUBE_API_KEY environment variable is not set');
    }
    return new YouTubeService(apiKey, YOUTUBE_CHANNEL_ID);
  }
}
