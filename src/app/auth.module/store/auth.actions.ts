import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] Login Start';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const AUTO_LOGOUT = '[Auth] Auto Logout';

export function login(payload: any) {
  return { type: LOGIN, payload };
}

export function loginSuccess(payload: any) {
  return { type: LOGIN_SUCCESS, payload };
}

export function logout(): Action {
  return { type: LOGOUT };
}

export function autoLogin() {
  return { type: AUTO_LOGIN };
}

export function autoLogout() {
  return { type: AUTO_LOGOUT };
}
