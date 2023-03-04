import { createSelector } from '@ngrx/store';
import { GlobalState } from './global.reducer';
import { AppState } from '../store/app.reducer';

export const selectGlobal = (state: AppState) => state.global;
export const selectIsLoading = createSelector(
  selectGlobal,
  (state: GlobalState) => state.isLoading
);
export const selectError = createSelector(
  selectGlobal,
  (state: GlobalState) => state.error
);
