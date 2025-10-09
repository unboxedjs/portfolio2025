export interface UdemyCourse {
  id: string;
  title: string;
  url: string;
  published_title: string | null;
}

export interface UdemyReview {
  id: string;
  content: string;
  rating: number;
  created: string;
  user: {
    title: string;
    name: string;
  };
}

export interface UdemyStats {
  totalCourses: number;
  publishedCourses: number;
  totalStudents: number;
  totalReviews: number;
  averageRating: number;
  topReviews: UdemyReview[];
  courses: {
    id: string;
    title: string;
    url: string;
    slug: string;
  }[];
}

export class UdemyService {
  private readonly baseUrl = 'https://www.udemy.com/instructor-api/v1';

  constructor(private apiToken: string) {}

  private async fetch<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Udemy API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getCourses(): Promise<UdemyCourse[]> {
    const data = await this.fetch<{ count: number; results: UdemyCourse[] }>(
      '/taught-courses/courses/?page_size=100'
    );
    return data.results.filter(course => course.published_title !== null);
  }

  async getReviews(pageSize = 100): Promise<UdemyReview[]> {
    const data = await this.fetch<{ count: number; results: UdemyReview[] }>(
      `/taught-courses/reviews/?page_size=${pageSize}&ordering=-created`
    );
    return data.results;
  }

  async getTopReviews(rating = 5.0, limit = 10): Promise<UdemyReview[]> {
    const data = await this.fetch<{ count: number; results: UdemyReview[] }>(
      `/taught-courses/reviews/?page_size=${limit}&rating=${rating}&ordering=-created`
    );
    // Filter out empty reviews and get only those with content
    return data.results.filter(r => r.content && r.content.trim().length > 0).slice(0, limit);
  }

  async getInstructorStats(): Promise<UdemyStats> {
    const [courses, allReviews] = await Promise.all([this.getCourses(), this.getReviews()]);

    // Calculate total students (this would need to come from course details if available)
    // For now, we'll use the review count as a proxy
    const totalReviews = allReviews.length;

    // Calculate average rating
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

    // Get top reviews with content
    const topReviews = await this.getTopReviews(5.0, 10);

    return {
      totalCourses: courses.length,
      publishedCourses: courses.length,
      totalStudents: 0, // This needs to be fetched from course performance if available
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10,
      topReviews,
      courses: courses.map(c => ({
        id: c.id,
        title: c.title,
        url: `https://www.udemy.com${c.url}`,
        slug: c.published_title || '',
      })),
    };
  }

  static async create(): Promise<UdemyService> {
    const apiToken = process.env.UDEMY_API_TOKEN;
    if (!apiToken) {
      throw new Error('UDEMY_API_TOKEN environment variable is not set');
    }
    return new UdemyService(apiToken);
  }
}
