import { types } from './types';

export interface ListenCurrentProfileAction {
  type: types.LISTEN_CURRENT_PROFILE_DATA;
  payload: any;
}

export interface ListenSelectedProfileAction {
  type: types.LISTEN_SELECTED_PROFILE_DATA;
  payload: any;
}

export const ListenCurrentProfile = (profile: any): ListenCurrentProfileAction => {
  return {
    type: types.LISTEN_CURRENT_PROFILE_DATA,
    payload: profile,
  };
};

export const ListenSelectedProfile = (profile: any): ListenSelectedProfileAction => {
  return {
    type: types.LISTEN_SELECTED_PROFILE_DATA,
    payload: profile,
  };
};