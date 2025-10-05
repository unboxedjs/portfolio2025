import { RouterReducerState } from '@ngrx/router-store';

export interface AppState {
  router: RouterReducerState;
  app: AppInitState;
}

export interface AppInitState {
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}
