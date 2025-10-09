import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { ChatBubbleComponent } from '../chat-bubble/chat-bubble';
import { RemoteConfigService } from '../../services/remote-config.service';

@Component({
  selector: 'app-conversation-section',
  standalone: true,
  imports: [CommonModule, LottieComponent, ChatBubbleComponent],
  templateUrl: './conversation-section.component.html',
  styleUrl: './conversation-section.component.css',
})
export class ConversationSectionComponent implements OnInit, OnDestroy {
  private remoteConfig = inject(RemoteConfigService);
  config = this.remoteConfig.config;
  work: AnimationOptions = {
    path: '/ae/work.json',
  };

  visibleMessages = signal<Set<number>>(new Set());
  inViewportMessages = signal<Set<number>>(new Set());
  private observer?: IntersectionObserver;
  private queuedMessages: number[] = [];
  private isProcessing = false;

  ngOnInit() {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');

            // Skip if already visible or queued
            if (this.visibleMessages().has(index) || this.queuedMessages.includes(index)) {
              return;
            }

            // Add to queue
            this.queuedMessages.push(index);
            this.queuedMessages.sort((a, b) => a - b);

            // Start processing if not already processing
            if (!this.isProcessing) {
              this.processNextMessage();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all message items after view init
    setTimeout(() => {
      const items = document.querySelectorAll('.conversation-item');
      items.forEach(item => this.observer?.observe(item));
    }, 100);
  }

  private processNextMessage() {
    if (this.queuedMessages.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const nextIndex = this.queuedMessages.shift()!;

    // No typing for first 8 messages (index 0-7), then randomly show typing (40% chance)
    const showTyping = nextIndex > 7 && Math.random() < 0.4;

    if (showTyping) {
      // Show bubble with typing indicator
      this.inViewportMessages.update(set => new Set(set).add(nextIndex));

      // Random typing duration between 500ms - 1000ms
      const typingDuration = 500 + Math.random() * 500;

      setTimeout(() => {
        this.visibleMessages.update(set => new Set(set).add(nextIndex));

        // Random delay before next message (100-300ms)
        const nextDelay = 100 + Math.random() * 200;
        setTimeout(() => {
          this.processNextMessage();
        }, nextDelay);
      }, typingDuration);
    } else {
      // Show message immediately without typing
      this.inViewportMessages.update(set => new Set(set).add(nextIndex));
      this.visibleMessages.update(set => new Set(set).add(nextIndex));

      // For first 8 messages (0-7): staggered delay (150-250ms), after that: 50-150ms
      const nextDelay = nextIndex <= 7 ? 150 + Math.random() * 100 : 50 + Math.random() * 100;
      setTimeout(() => {
        this.processNextMessage();
      }, nextDelay);
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  isVisible(index: number): boolean {
    return this.visibleMessages().has(index);
  }

  isInViewport(index: number): boolean {
    return this.inViewportMessages().has(index);
  }

  goToUrl(type = 'jasmine') {
    const siteUrl =
      type === 'jasmine' ? this.config().udemyJasmineUrl : this.config().udemyAngularnestUrl;
    window.open(siteUrl, '_blank');
  }
}
