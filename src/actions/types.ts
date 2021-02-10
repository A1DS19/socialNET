import { OpenModalAction, CloseModalAction } from '../actions/modals';
import * as event from './event';

import { SignInAction, SignOutAction } from './auth';
import {
  AsyncActionStart,
  AsyncActionError,
  AsyncActionFinish,
  AppLoaded,
} from './loading';
import {
  ListenCurrentProfileAction,
  ListenSelectedProfileAction,
  ListenUserPhotos,
  ListenUserEvents,
  ListenUserFollowers,
  ListenUserFollowings,
  SetFollowUser,
  SetUnFollowUser,
  ClearFollowersData,
  ListenUserNewsFeed,
} from './profile';

export const TIME_VALUE = 'MMMM d, yyyy h:mm a';

export enum types {
  //Events
  FETCH_EVENTS,
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  LISTEN_EVENTS_CHAT,
  CLEAR_EVENTS_CHAT,
  LISTEN_SELECTED_EVENT,
  CLEAR_EVENTS,
  SET_FILTER,
  SET_START_DATE,
  RETAIN_STATE,
  ClEAR_SELECTED_EVENT,
  //Modals
  OPEN_MODAL,
  CLOSE_MODAL,
  //Auth
  SIGNED_IN,
  SIGNED_OUT,
  //Loading
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR,
  //App Loaded
  APP_LOADED,
  //User Profile
  LISTEN_CURRENT_PROFILE_DATA,
  LISTEN_SELECTED_PROFILE_DATA,
  LISTEN_USER_PHOTOS,
  LISTEN_USER_EVENTS,
  LISTEN_USER_FOLLOWERS,
  LISTEN_USER_FOLLOWINGS,
  SET_FOLLOW_USER,
  SET_UNFOLLOW_USER,
  CLEAR_FOLLOWERS_DATA,
  LISTEN_USER_NEWS_FEED,
}

export type EventAction =
  | event.CreateEventAction
  | event.UpdateEventAction
  | event.DeleteEventAction
  | event.FetchEventAction
  | event.ListenEventsChat
  | event.ListenSelectedEvent
  | event.ClearEventsChat
  | event.ClearEvents
  | event.Filter
  | event.StartDate
  | event.RetainState
  | event.ClearSelectedEvent;

export type ModalAction = OpenModalAction | CloseModalAction;

export type AuthAction = SignInAction | SignOutAction;

export type LoadingAction =
  | AsyncActionError
  | AsyncActionFinish
  | AsyncActionStart
  | AppLoaded;

export type ProfileAction =
  | ListenCurrentProfileAction
  | ListenSelectedProfileAction
  | ListenUserPhotos
  | ListenUserEvents
  | ListenUserFollowers
  | ListenUserFollowings
  | SetFollowUser
  | SetUnFollowUser
  | ClearFollowersData
  | ListenUserNewsFeed;
