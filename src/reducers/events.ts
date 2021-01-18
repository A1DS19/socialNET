import { EventData } from './../actions/event';
import { types, EventAction } from '../actions/types';

export interface EventsState {
  events: EventData[] | [];
}

const initialState: EventsState = {
  events: [],
};

export const eventsReducer = (state: any = initialState, action: EventAction) => {
  switch (action.type) {
    case types.CREATE_EVENT:
      return { ...state, events: [...state.events, action.payload] };

    case types.FETCH_EVENTS:
      return { ...state, events: action.payload };

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

    default:
      return state;
  }
};
