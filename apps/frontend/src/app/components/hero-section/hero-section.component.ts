import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent implements OnInit {
  themeService = inject(ThemeService);
  displayedText = signal('');
  showCursor = signal(true);
  private fullText = 'A Full Stack Web Developer';
  private currentIndex = 0;

  get headerImage() {
    return this.themeService.theme() === 'light' ? '/header_light.png' : '/header.jpg';
  }

  ngOnInit() {
    // Start typewriter after a short delay
    setTimeout(() => {
      this.typeWriter();
    }, 500);

    // Blinking cursor
    setInterval(() => {
      this.showCursor.update(v => !v);
    }, 500);
  }

  private typeWriter() {
    if (this.currentIndex < this.fullText.length) {
      this.displayedText.update(text => text + this.fullText.charAt(this.currentIndex));
      this.currentIndex++;
      setTimeout(() => this.typeWriter(), 100);
    } else {
      // Stop blinking cursor after typing is complete
      setTimeout(() => {
        this.showCursor.set(false);
      }, 1000);
    }
  }
}
