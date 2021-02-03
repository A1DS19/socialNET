import { type } from 'os';
import { types } from './types';

export interface ListenCurrentProfileAction {
  type: types.LISTEN_CURRENT_PROFILE_DATA;
  payload: any;
}

export interface ListenSelectedProfileAction {
  type: types.LISTEN_SELECTED_PROFILE_DATA;
  payload: any;
}

export interface ListenUserPhotos {
  type: types.LISTEN_USER_PHOTOS;
  payload: any;
}

export interface ListenUserEvents {
  type: types.LISTEN_USER_EVENTS;
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

export const listenUserPhotos = (photos: any): ListenUserPhotos => {
  return {
    type: types.LISTEN_USER_PHOTOS,
    payload: photos,
  };
};

export const listenUserEvents = (events: any): ListenUserEvents => {
  return {
    type: types.LISTEN_USER_EVENTS,
    payload: events,
  };
};
