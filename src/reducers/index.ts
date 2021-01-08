import { combineReducers } from 'redux';
import { eventsReducer } from './events';
import { EventData } from '../actions/event';

export interface StoreState {
  events: EventData[];
}

export const reducers = combineReducers<StoreState>({
  events: eventsReducer,
});
