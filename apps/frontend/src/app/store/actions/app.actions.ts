import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    'Initialize App': emptyProps(),
    'Initialize App Success': emptyProps(),
    'Initialize App Failure': props<{ error: string }>(),
    'Set Loading': props<{ isLoading: boolean }>(),
  },
});
