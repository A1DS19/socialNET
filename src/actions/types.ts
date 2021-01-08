import { CreateEventAction, UpdateEventAction, DeleteEventAction } from './event';

export enum types {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
}

export type EventAction = CreateEventAction | UpdateEventAction | DeleteEventAction;
