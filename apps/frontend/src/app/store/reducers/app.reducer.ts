import { createReducer, on } from '@ngrx/store';
import { AppInitState } from '../models/app-state.model';
import { AppActions } from '../actions/app.actions';

export const initialAppState: AppInitState = {
  isLoading: false,
  isInitialized: false,
  error: null,
};

export const appReducer = createReducer(
  initialAppState,
  on(AppActions.initializeApp, state => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(AppActions.initializeAppSuccess, state => ({
    ...state,
    isLoading: false,
    isInitialized: true,
    error: null,
  })),
  on(AppActions.initializeAppFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    isInitialized: false,
    error,
  })),
  on(AppActions.setLoading, (state, { isLoading }) => ({
    ...state,
    isLoading,
  }))
);
