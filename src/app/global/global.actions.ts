import { createAction, props } from '@ngrx/store';

export const setLoading = createAction(
  '[Global] Loading',
  props<{ isLoading: boolean; error: string }>()
);
export const setError = createAction(
  '[Global] Set Error ',
  props<{ error: string }>()
);
