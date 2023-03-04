import { AuthState, reducer } from '../auth.module/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { globalReducer, GlobalState } from '../global/global.reducer';

export interface AppState {
  auth: AuthState;
  global: GlobalState;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: reducer,
  global: globalReducer,
};
