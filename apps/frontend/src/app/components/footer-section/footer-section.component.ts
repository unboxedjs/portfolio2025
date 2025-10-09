import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteConfigService } from '../../services/remote-config.service';

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
}
