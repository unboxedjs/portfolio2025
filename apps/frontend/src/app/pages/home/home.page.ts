import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ConversationSectionComponent } from '../../components/conversation-section/conversation-section.component';
import { FooterSectionComponent } from '../../components/footer-section/footer-section.component';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle';
import { BackToTopComponent } from '../../components/back-to-top/back-to-top.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    ConversationSectionComponent,
    FooterSectionComponent,
    ThemeToggleComponent,
    BackToTopComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {}
