import { types } from './types';

export interface AuthPayload {
  email: string;
  password: string;
  photoURL?: string;
}

export interface SignInAction {
  type: types.SIGNED_IN;
  payload: AuthPayload;
}

export interface SignOutAction {
  type: types.SIGNED_OUT;
}

export const signInUser = (payload: AuthPayload) => {
  return {
    type: types.SIGNED_IN,
    payload,
  };
};

export const signOutUser = (): SignOutAction => {
  return {
    type: types.SIGNED_OUT,
  };
};
