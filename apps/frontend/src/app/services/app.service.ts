import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { RemoteConfigService } from './remote-config.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private remoteConfig = inject(RemoteConfigService);

  initializeApp(): Observable<void> {
    return from(this.remoteConfig.initialize()).pipe(map(() => void 0));
  }
}
