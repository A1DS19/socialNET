import { types, EventAction } from '../actions/types';
import { EventData } from '../actions/event';

//test data
import { sampleData } from '../api/sampleData';

export const eventsReducer = (state: EventData[] = sampleData, action: EventAction) => {
  switch (action.type) {
    case types.CREATE_EVENT:
      return state.concat(action.payload);

    case types.UPDATE_EVENT:
      return state.map((event: EventData) => {
        if (event.id !== action.payload.id) {
          return event;
        } else return { ...event, ...action.payload };
      });

    case types.DELETE_EVENT:
      return state.filter((event: EventData) => event.id !== action.payload);

    default:
      return state;
  }
};
