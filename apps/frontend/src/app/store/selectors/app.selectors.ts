import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppInitState } from '../models/app-state.model';

export const selectAppState = createFeatureSelector<AppInitState>('app');

export const selectIsLoading = createSelector(selectAppState, state => state.isLoading);

export const selectIsInitialized = createSelector(selectAppState, state => state.isInitialized);

export const selectAppError = createSelector(selectAppState, state => state.error);

export const selectAppStatus = createSelector(selectAppState, state => ({
  isLoading: state.isLoading,
  isInitialized: state.isInitialized,
  hasError: !!state.error,
  error: state.error,
}));
