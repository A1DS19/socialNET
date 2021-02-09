import { EventData } from './../actions/event';
import { types, EventAction } from '../actions/types';

export interface EventsState {
  events: EventData[] | [];
  moreEvents: boolean;
  selectedEvent: EventData | undefined;
  comments: [];
}

const initialState: EventsState = {
  selectedEvent: undefined,
  events: [],
  moreEvents: true,
  comments: [],
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
      return { ...state, events: [], moreEvents: true };

    default:
      return state;
  }
};
