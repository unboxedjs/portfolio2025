import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppActions } from '../actions/app.actions';
import { AppService } from '../../services/app.service';

@Injectable()
export class AppEffects {
  private readonly actions$ = inject(Actions);
  private readonly appService = inject(AppService);

  initializeApp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.initializeApp),
      switchMap(() =>
        this.appService.initializeApp().pipe(
          map(() => AppActions.initializeAppSuccess()),
          catchError(error => of(AppActions.initializeAppFailure({ error: error.message })))
        )
      )
    )
  );
}
