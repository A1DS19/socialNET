import {
  fetchToEventsFromFirestore,
  dataFromSnapshot,
} from './../firestore/firestoreService';
import { Dispatch } from 'redux';
import { types } from './types';
import { asyncActionStart, asyncActionFinish, asyncActionError } from './loading';
export interface EventData {
  id?: string;
  hostUid?: string;
  title: string;
  date: Date;
  category: string;
  description: string;
  venue: Venue_City;
  city: Venue_City;
  isCancelled?: boolean;
  hostedBy?: string;
  hostPhotoURL?: string;
  attendees?: EventAttendee[];
}

export interface Coords {
  lat: number;
  lng: number;
}

export interface Venue_City {
  address: string;
  latLng: google.maps.LatLngLiteral | null;
}

export interface EventAttendee {
  id: string;
  name: string;
  photoURL: string;
}

export interface CreateEventAction {
  type: types.CREATE_EVENT;
  payload: EventData;
}

export interface UpdateEventAction {
  type: types.UPDATE_EVENT;
  payload: EventData;
}

export interface DeleteEventAction {
  type: types.DELETE_EVENT;
  payload: string;
}

export interface FetchEventAction {
  type: types.FETCH_EVENTS;
  payload?: any;
}
export interface ListenSelectedEvent {
  type: types.LISTEN_SELECTED_EVENT;
  payload: any;
}

export interface ClearEvents {
  type: types.CLEAR_EVENTS;
}

export interface ListenEventsChat {
  type: types.LISTEN_EVENTS_CHAT;
  payload: any;
}

export interface ClearEventsChat {
  type: types.CLEAR_EVENTS_CHAT;
}

// export const listenEventsFS = (events: EventData[]) => {
//   return async (dispatch: Dispatch) => {
//     dispatch<FetchEventAction>({ type: types.FETCH_EVENTS, payload: events });
//   };
// };

export const clearEvents = (): ClearEvents => {
  return {
    type: types.CLEAR_EVENTS,
  };
};

export const listenSelectedEvent = (event: any) => {
  return async (dispatch: Dispatch) => {
    dispatch<ListenSelectedEvent>({ type: types.LISTEN_SELECTED_EVENT, payload: event });
  };
};

export const fetchEvents = (predicate: any, limit: number, lastDocSnapshot?: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const snapShot = await fetchToEventsFromFirestore(
        predicate,
        limit,
        lastDocSnapshot
      ).get();

      //El ultimo documento visible del query
      const lastVisibleDoc = snapShot.docs[snapShot.docs.length - 1];
      const moreEvents = snapShot.docs.length >= limit;
      const events = snapShot.docs.map((doc: any) => dataFromSnapshot(doc));

      dispatch(asyncActionStart());
      dispatch<FetchEventAction>({
        type: types.FETCH_EVENTS,
        payload: { events, moreEvents },
      });
      dispatch({ type: types.APP_LOADED });
      dispatch(asyncActionFinish());
      return lastVisibleDoc;
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
};

export const createEvent = (event: EventData) => {
  return async (dispatch: Dispatch) => {
    dispatch<CreateEventAction>({ type: types.CREATE_EVENT, payload: event });
  };
};

export const updateEvent = (event: EventData) => {
  return async (dispatch: Dispatch) => {
    dispatch<UpdateEventAction>({ type: types.UPDATE_EVENT, payload: event });
  };
};

export const deleteEvent = (eventId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch<DeleteEventAction>({ type: types.DELETE_EVENT, payload: eventId });
  };
};

export const listenToEventsChat = (comments: any) => {
  return {
    type: types.LISTEN_EVENTS_CHAT,
    payload: comments,
  };
};

export const clearEventsChat = (): ClearEventsChat => {
  return {
    type: types.CLEAR_EVENTS_CHAT,
  };
};
