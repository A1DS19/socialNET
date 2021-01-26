import { profileReducer, ProfileStateProps } from './profile';
import { LoadingState } from './../actions/loading';
import { InitialStateProps, authReducer } from './auth';
import { modalsReducer } from './modals';
import { ModalPayload } from './../actions/modals';
import { combineReducers } from 'redux';
import { eventsReducer } from './events';
import { loadingReducer } from './loading';
import { EventsState } from './events';

export interface StoreState {
  events: EventsState;
  modals: ModalPayload | null;
  auth: InitialStateProps;
  loading: LoadingState;
  profile: ProfileStateProps;
}

export const reducers = combineReducers<StoreState>({
  events: eventsReducer,
  modals: modalsReducer,
  auth: authReducer,
  loading: loadingReducer,
  profile: profileReducer,
});
