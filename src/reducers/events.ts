import { types, EventAction } from '../actions/types';
import { EventData } from '../actions/event';

//quitar ahora
import { sampleData } from '../api/sampleData';

export const eventsReducer = (state: EventData[] = sampleData, action: EventAction) => {
  switch (action.type) {
    case types.CREATE_EVENT:
      return { ...state, events: [...state, action.payload] };

    case types.UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.filter((event: EventData) => event.id !== action.payload.id),
          action.payload,
        ],
      };

    case types.DELETE_EVENT:
      return state.filter((event: EventData) => event.id !== action.payload);

    default:
      return state;
  }
};
