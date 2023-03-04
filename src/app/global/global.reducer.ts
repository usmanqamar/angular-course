import { Action, createReducer, on } from '@ngrx/store';
import { setError, setLoading } from './global.actions';

export interface GlobalState {
  isLoading: boolean;
  error: string;
}

const initialState: GlobalState = {
  isLoading: false,
  error: '',
};

export const globalReducer = createReducer(
  initialState,
  on(setLoading, (state: GlobalState, { isLoading, error }) => ({
    ...state,
    isLoading,
    error,
  }))
);
