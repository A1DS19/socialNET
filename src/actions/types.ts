import { OpenModalAction, CloseModalAction } from '../actions/modals';
import {
  CreateEventAction,
  UpdateEventAction,
  DeleteEventAction,
  FetchEventAction,
} from './event';
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
} from './profile';

export const TIME_VALUE = 'MMMM d, yyyy h:mm a';

export enum types {
  //Events
  FETCH_EVENTS,
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
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
}

export type EventAction =
  | CreateEventAction
  | UpdateEventAction
  | DeleteEventAction
  | FetchEventAction;
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
  | ListenUserEvents;
