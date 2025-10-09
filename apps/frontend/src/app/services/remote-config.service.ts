import { Injectable, signal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { fetchAndActivate, getRemoteConfig, getString } from 'firebase/remote-config';
import { environment } from '../../environments/environment';
import { PortfolioConfig } from '../interfaces/portfolio-config.interface';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {
  private app = initializeApp(environment.firebase);
  private remoteConfig = getRemoteConfig(this.app);

  // Default values (should match remoteconfig.template.json)
  private readonly defaults: Record<string, string> = {
    stats_years_experience: '10',
    stats_projects: '18',
    stats_udemy_courses: '2',
    youtube_subscribers: '240',
    youtube_views: '10.9k',
    youtube_watch_hours: '280',
    udemy_students: '659',
    udemy_rating: '3.5',
    udemy_reviews: '122',
    udemy_jasmine_url: 'https://www.udemy.com/course/angular-unit-testing-with-jasmine-karma/',
    udemy_angularnest_url:
      'https://www.udemy.com/course/angularnest/?referralCode=80CA9F9919C75A5A3973',
    social_twitter: 'https://twitter.com/unboxedjs',
    social_youtube: 'https://www.youtube.com/channel/UCob_lLtu_hj80nHduNzzQiw',
    social_facebook: 'https://www.facebook.com/kvsuren/',
    social_instagram: 'https://www.instagram.com/unboxedjs/',
    social_linkedin: 'https://www.linkedin.com/in/unboxedjs/',
    social_buymeacoffee: 'https://www.buymeacoffee.com/unboxedjs',
    contact_email: 'suren@unboxedjs.com',
    upwork_url: 'https://www.upwork.com/freelancers/~01969204f1b1dd4476',
  };

  // Signal to hold all config values
  config = signal<PortfolioConfig>(this.mapToConfig(this.defaults));

  constructor() {
    // Set minimum fetch interval for development (1 hour for production)
    this.remoteConfig.settings.minimumFetchIntervalMillis = environment.production
      ? 3600000
      : 60000;

    // Set default values
    this.remoteConfig.defaultConfig = this.defaults;
  }

  async initialize(): Promise<void> {
    try {
      await fetchAndActivate(this.remoteConfig);
      this.loadConfig();
    } catch (error) {
      console.warn('Failed to fetch remote config, using defaults:', error);
      // Config signal already has default values
    }
  }

  private loadConfig(): void {
    this.config.set({
      statsYearsExperience: getString(this.remoteConfig, 'stats_years_experience'),
      statsProjects: getString(this.remoteConfig, 'stats_projects'),
      statsUdemyCourses: getString(this.remoteConfig, 'stats_udemy_courses'),
      youtubeSubscribers: getString(this.remoteConfig, 'youtube_subscribers'),
      youtubeViews: getString(this.remoteConfig, 'youtube_views'),
      youtubeWatchHours: getString(this.remoteConfig, 'youtube_watch_hours'),
      udemyStudents: getString(this.remoteConfig, 'udemy_students'),
      udemyRating: getString(this.remoteConfig, 'udemy_rating'),
      udemyReviews: getString(this.remoteConfig, 'udemy_reviews'),
      udemyJasmineUrl: getString(this.remoteConfig, 'udemy_jasmine_url'),
      udemyAngularnestUrl: getString(this.remoteConfig, 'udemy_angularnest_url'),
      socialTwitter: getString(this.remoteConfig, 'social_twitter'),
      socialYoutube: getString(this.remoteConfig, 'social_youtube'),
      socialFacebook: getString(this.remoteConfig, 'social_facebook'),
      socialInstagram: getString(this.remoteConfig, 'social_instagram'),
      socialLinkedin: getString(this.remoteConfig, 'social_linkedin'),
      socialBuymeacoffee: getString(this.remoteConfig, 'social_buymeacoffee'),
      contactEmail: getString(this.remoteConfig, 'contact_email'),
      upworkUrl: getString(this.remoteConfig, 'upwork_url'),
    });
  }

  private mapToConfig(values: Record<string, string>): PortfolioConfig {
    return {
      statsYearsExperience: values['stats_years_experience'],
      statsProjects: values['stats_projects'],
      statsUdemyCourses: values['stats_udemy_courses'],
      youtubeSubscribers: values['youtube_subscribers'],
      youtubeViews: values['youtube_views'],
      youtubeWatchHours: values['youtube_watch_hours'],
      udemyStudents: values['udemy_students'],
      udemyRating: values['udemy_rating'],
      udemyReviews: values['udemy_reviews'],
      udemyJasmineUrl: values['udemy_jasmine_url'],
      udemyAngularnestUrl: values['udemy_angularnest_url'],
      socialTwitter: values['social_twitter'],
      socialYoutube: values['social_youtube'],
      socialFacebook: values['social_facebook'],
      socialInstagram: values['social_instagram'],
      socialLinkedin: values['social_linkedin'],
      socialBuymeacoffee: values['social_buymeacoffee'],
      contactEmail: values['contact_email'],
      upworkUrl: values['upwork_url'],
    };
  }
}
