import { UserModel } from '../user.model';
import { LOGIN, LOGIN_SUCCESS, LOGOUT } from './auth.actions';

export interface AuthState {
  user: UserModel | null;
}
const initialState: AuthState = {
  user: null,
};

export function reducer(state = initialState, action: any) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload };
      break;

    case LOGOUT:
      return { ...state, user: null };
      break;
    default:
      return state;
  }
}
