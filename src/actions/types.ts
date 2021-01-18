import { OpenModalAction, CloseModalAction } from '../actions/modals';
import {
  CreateEventAction,
  UpdateEventAction,
  DeleteEventAction,
  FetchEventAction,
} from './event';
import { SignInAction, SignOutAction } from './auth';
import { AsyncActionStart, AsyncActionError, AsyncActionFinish } from './loading';

export const TIME_VALUE = 'MMMM d, yyyy h:mm a';

export enum types {
  FETCH_EVENTS,
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  OPEN_MODAL,
  CLOSE_MODAL,
  SIGNED_IN,
  SIGNED_OUT,
  //Loading state
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR,
  //Loading state fin
}

export type EventAction =
  | CreateEventAction
  | UpdateEventAction
  | DeleteEventAction
  | FetchEventAction;
export type ModalAction = OpenModalAction | CloseModalAction;
export type AuthAction = SignInAction | SignOutAction;
export type LoadingAction = AsyncActionError | AsyncActionFinish | AsyncActionStart;
