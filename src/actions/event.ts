import { Dispatch } from 'redux';
import { types } from './types';

export interface EventData {
  id?: string;
  title: string;
  date: Date;
  category: string;
  description: string;
  venue: Venue_City;
  city: Venue_City;
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
