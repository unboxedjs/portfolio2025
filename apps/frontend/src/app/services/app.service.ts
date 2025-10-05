import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  initializeApp(): Observable<void> {
    // Simulate app initialization (e.g., loading configuration, user session, etc.)
    return of(void 0).pipe(
      delay(1500) // Simulate async operation
    );
  }
}
