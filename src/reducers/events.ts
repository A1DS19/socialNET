import { EventData } from './../actions/event';
import { types, EventAction } from '../actions/types';

export interface EventsState {
  events: EventData[] | [];
  moreEvents: boolean;
  selectedEvent: EventData | undefined;
  lastVisibleDoc: any;
  filter: 'all' | 'isGoing' | 'isHosting';
  startDate: Date | Date[];
  retainState: boolean;
  comments: [];
}

const initialState: EventsState = {
  selectedEvent: undefined,
  events: [],
  moreEvents: true,
  comments: [],
  lastVisibleDoc: null,
  filter: 'all',
  startDate: new Date(),
  retainState: false,
};

export const eventsReducer = (state: any = initialState, action: EventAction) => {
  switch (action.type) {
    case types.CREATE_EVENT:
      return { ...state, events: [...state.events, action.payload] };

    case types.FETCH_EVENTS:
      return {
        ...state,
        //agrega los eventos para cuando apretar 'ver mas' se agreguen a la
        //misma pagina
        events: [...state.events, ...action.payload.events],
        moreEvents: action.payload.moreEvents,
        lastVisibleDoc: action.payload.lastVisibleDoc,
      };

    case types.UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter((event: EventData) => event.id !== action.payload.id),
          action.payload,
        ],
      };

    case types.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event: EventData) => event.id !== action.payload),
      };

    case types.LISTEN_SELECTED_EVENT:
      return { ...state, selectedEvent: action.payload };

    case types.LISTEN_EVENTS_CHAT:
      return { ...state, comments: action.payload };

    case types.CLEAR_EVENTS_CHAT:
      return { ...state, comments: [] };

    case types.CLEAR_EVENTS:
      return { ...state, events: [], moreEvents: true, lastVisibleDoc: null };
    case types.SET_FILTER:
      return { ...state, retainState: false, moreEvents: true, filter: action.payload };
    case types.SET_START_DATE:
      return {
        ...state,
        retainState: false,
        moreEvents: true,
        startDate: action.payload,
      };
    case types.RETAIN_STATE:
      return { ...state, retainState: true };
    case types.ClEAR_SELECTED_EVENT:
      return { ...state, selectedEvent: undefined };

    default:
      return state;
  }
};
