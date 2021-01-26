import { AuthPayload } from './../actions/auth';
import { EventData } from '../actions/event';
import { firebase } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

const db = firebase.firestore();

//get all events
export const listenToEventsFromFirestore = () => {
  return db.collection('events').orderBy('date');
};

//get an event
export const listenToEventFromFirestore = (eventId: string) => {
  return db.collection('events').doc(eventId);
};

//create a event
export const addEventToFirestore = (event: EventData) => {
  return db.collection('events').add({
    ...event,
    hostedBy: 'Diana',
    hostPhotoURL: 'https://randomuser.me/api/portraits/women/20.jpg',
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: uuidv4.toString(),
      name: 'Diana',
      photoURL: 'https://randomuser.me/api/portraits/women/20.jpg',
    }),
  });
};

//update event
export const updateEventFirestore = (event: EventData) => {
  return db.collection('events').doc(event.id).update(event);
};

//delete event
export const deleteEventFirestore = (eventId: string) => {
  return db.collection('events').doc(eventId).delete();
};

//cancel event
export const cancelEventToggle = (event: EventData | undefined) => {
  return db.collection('events').doc(event!.id).update({
    isCancelled: !event!.isCancelled,
  });
};

//create user profile
export const setUserProfileData = (user: any) => {
  return db
    .collection('users')
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

//get user data
export const getUserProfileData = (userId: string | undefined) => {
  return db.collection('users').doc(userId);
};

//update profile data
export const updateUserProfileData = async (profile: any) => {
  const user = firebase.auth().currentUser;
  try {
    if (user?.displayName !== profile.displayName) {
      await user?.updateProfile({
        displayName: profile.displayName,
      });
    }
    return await db.collection('users').doc(user?.uid).update(profile);
  } catch (error) {
    throw error;
  }
};

export const dataFromSnapshot = (snapshot: any) => {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  //arreglar fecha a objecto JS ya que viene como timestamp
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  //agregar id a datos de db
  return {
    ...data,
    id: snapshot.id,
  };
};
