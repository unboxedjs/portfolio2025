import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { AppState } from '../models/app-state.model';
import { appReducer } from './app.reducer';

export const rootReducer: ActionReducerMap<AppState> = {
  router: routerReducer,
  app: appReducer,
};
