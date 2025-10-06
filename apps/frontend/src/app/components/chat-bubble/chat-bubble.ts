import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-bubble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-bubble.html',
  styleUrl: './chat-bubble.css',
})
export class ChatBubbleComponent {
  index = input.required<number>();
  position = input<'left' | 'right'>('left');
  isVisible = input.required<boolean>();
  isInViewport = input.required<boolean>();
  customClasses = input<string>('');
  wrapperClasses = input<string>('');
}
