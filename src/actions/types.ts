import { OpenModalAction, CloseModalAction } from '../actions/modals';
import { CreateEventAction, UpdateEventAction, DeleteEventAction } from './event';
import { SignInAction, SignOutAction } from './auth';

export const TIME_VALUE = 'MMMM d, yyyy h:mm a';

export enum types {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  OPEN_MODAL,
  CLOSE_MODAL,
  SIGNED_IN,
  SIGNED_OUT,
}

export type EventAction = CreateEventAction | UpdateEventAction | DeleteEventAction;
export type ModalAction = OpenModalAction | CloseModalAction;
export type AuthAction = SignInAction | SignOutAction;
