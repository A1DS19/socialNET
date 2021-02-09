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

export interface ListenUserFollowers {
  type: types.LISTEN_USER_FOLLOWERS;
  payload: any;
}

export interface ListenUserFollowings {
  type: types.LISTEN_USER_FOLLOWINGS;
  payload: any;
}

export interface SetFollowUser {
  type: types.SET_FOLLOW_USER;
}
export interface SetUnFollowUser {
  type: types.SET_UNFOLLOW_USER;
}

export interface ClearFollowersData {
  type: types.CLEAR_FOLLOWERS_DATA;
}

export interface ListenUserNewsFeed {
  type: types.LISTEN_USER_NEWS_FEED;
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

export const listenUserFollowers = (followers: any): ListenUserFollowers => {
  return {
    type: types.LISTEN_USER_FOLLOWERS,
    payload: followers,
  };
};

export const listenUserFollowings = (followers: any): ListenUserFollowings => {
  return {
    type: types.LISTEN_USER_FOLLOWINGS,
    payload: followers,
  };
};

export const setFollowUser = (): SetFollowUser => {
  return {
    type: types.SET_FOLLOW_USER,
  };
};
export const setUnFollowUser = (): SetUnFollowUser => {
  return {
    type: types.SET_UNFOLLOW_USER,
  };
};

export const clearFollowersData = (): ClearFollowersData => {
  return {
    type: types.CLEAR_FOLLOWERS_DATA,
  };
};

export const listenUserNewsFeed = (feed: any): ListenUserNewsFeed => {
  return {
    type: types.LISTEN_USER_NEWS_FEED,
    payload: feed,
  };
};
