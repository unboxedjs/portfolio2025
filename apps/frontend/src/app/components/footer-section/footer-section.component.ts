import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteConfigService } from '../../services/remote-config.service';
import { getFunctions, httpsCallable } from 'firebase/functions';

@Component({
  selector: 'app-footer-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer-section.component.html',
  styleUrl: './footer-section.component.css',
})
export class FooterSectionComponent {
  private remoteConfig = inject(RemoteConfigService);
  config = this.remoteConfig.config;

  isSyncing = signal(false);
  private clickCount = 0;
  private clickTimer: any;

  async onLogoClick(event: MouseEvent) {
    // Secret triggers:
    // - 5 clicks: Sync Udemy stats
    // - 3 clicks + Shift key: Sync YouTube stats
    // - 7 clicks + Ctrl key: Sync both
    this.clickCount++;

    if (this.clickCount === 1) {
      this.clickTimer = setTimeout(() => {
        this.clickCount = 0;
      }, 2000);
    }

    // Sync both (7 clicks + Ctrl)
    if (this.clickCount === 7 && event.ctrlKey) {
      clearTimeout(this.clickTimer);
      this.clickCount = 0;
      await this.syncBothStats();
    }
    // Sync YouTube (3 clicks + Shift)
    else if (this.clickCount === 3 && event.shiftKey) {
      clearTimeout(this.clickTimer);
      this.clickCount = 0;
      await this.syncYouTubeStats();
    }
    // Sync Udemy (5 clicks)
    else if (this.clickCount === 5 && !event.ctrlKey && !event.shiftKey) {
      clearTimeout(this.clickTimer);
      this.clickCount = 0;
      await this.syncUdemyStats();
    }
  }

  private async syncUdemyStats() {
    if (this.isSyncing()) return;

    try {
      this.isSyncing.set(true);
      console.log('🚀 Syncing Udemy stats...');

      const functions = getFunctions();
      const syncStats = httpsCallable(functions, 'syncUdemyStatsManual');
      const result = await syncStats();

      console.log('✅ Udemy stats synced successfully', result);
      alert('Udemy stats updated! Refresh the page to see changes.');

      // Reload remote config
      await this.remoteConfig.initialize();
    } catch (error) {
      console.error('❌ Error syncing Udemy stats:', error);
      alert('Failed to sync Udemy stats. Check console for details.');
    } finally {
      this.isSyncing.set(false);
    }
  }

  private async syncYouTubeStats() {
    if (this.isSyncing()) return;

    try {
      this.isSyncing.set(true);
      console.log('🎥 Syncing YouTube stats...');

      const functions = getFunctions();
      const syncStats = httpsCallable(functions, 'syncYouTubeStatsManual');
      const result = await syncStats();

      console.log('✅ YouTube stats synced successfully', result);
      alert('YouTube stats updated! Refresh the page to see changes.');

      // Reload remote config
      await this.remoteConfig.initialize();
    } catch (error) {
      console.error('❌ Error syncing YouTube stats:', error);
      alert('Failed to sync YouTube stats. Check console for details.');
    } finally {
      this.isSyncing.set(false);
    }
  }

  private async syncBothStats() {
    if (this.isSyncing()) return;

    try {
      this.isSyncing.set(true);
      console.log('🔄 Syncing all stats (Udemy + YouTube)...');

      const functions = getFunctions();
      const [udemyResult, youtubeResult] = await Promise.all([
        httpsCallable(functions, 'syncUdemyStatsManual')(),
        httpsCallable(functions, 'syncYouTubeStatsManual')(),
      ]);

      console.log('✅ All stats synced successfully', { udemyResult, youtubeResult });
      alert('All stats updated! Refresh the page to see changes.');

      // Reload remote config
      await this.remoteConfig.initialize();
    } catch (error) {
      console.error('❌ Error syncing stats:', error);
      alert('Failed to sync stats. Check console for details.');
    } finally {
      this.isSyncing.set(false);
    }
  }
}
