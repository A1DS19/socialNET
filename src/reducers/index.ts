import { InitialStateProps, authReducer } from './auth';
import { modalsReducer } from './modals';
import { ModalPayload } from './../actions/modals';
import { combineReducers } from 'redux';
import { eventsReducer } from './events';
import { EventData } from '../actions/event';

export interface StoreState {
  events: EventData[];
  modals: ModalPayload | null;
  auth: InitialStateProps;
}

export const reducers = combineReducers<StoreState>({
  events: eventsReducer,
  modals: modalsReducer,
  auth: authReducer,
});
