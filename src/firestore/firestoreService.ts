import { EventAttendee, EventData } from '../actions/event';
import { firebase } from '../config/firebase';

const db = firebase.firestore();

export const updateUserProfilePhoto = async (downloadURL: string, filename: string) => {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection('users').doc(user?.uid);
  try {
    const userDoc = await userDocRef.get();

    if (!userDoc.data()?.photoURL) {
      await db.collection('users').doc(user?.uid).update({
        photoURL: downloadURL,
      });
      await user?.updateProfile({
        photoURL: downloadURL,
      });
    }
    return await db.collection('users').doc(user?.uid).collection('photos').add({
      name: filename,
      url: downloadURL,
    });
  } catch (error) {
    throw error;
  }
};

export const getUserPhotos = (userUID: string) => {
  return db.collection('users').doc(userUID).collection('photos');
};

export const setMainPhoto = async (photo: any) => {
  const user = firebase.auth().currentUser;
  const today = new Date();

  const eventDocQuery = db
    .collection('events')
    .where('attendeeIds', 'array-contains', user?.uid)
    .where('date', '>=', today);

  const userFollowingRef = db
    .collection('following')
    .doc(user?.uid)
    .collection('userFollowing');

  const batch = db.batch();

  batch.update(db.collection('users').doc(user?.uid), {
    photoURL: photo.url,
  });

  try {
    //actualiza foto de usuario en documentos de eventos
    //al momento de cambiarla
    const eventsQuerySnap = await eventDocQuery.get();
    for (let i = 0; i < eventsQuerySnap.docs.length; i++) {
      let eventDoc = eventsQuerySnap.docs[i];
      if (eventDoc.data().hostUid === user?.uid) {
        batch.update(eventsQuerySnap.docs[i].ref, {
          hostPhotoURL: photo.url,
        });
      }

      batch.update(eventsQuerySnap.docs[i].ref, {
        attendees: eventDoc.data().attendees.filter((attendee: any) => {
          if (attendee.id === user?.uid) {
            attendee.photoURL = photo.url;
          }
          return attendee;
        }),
      });
    }
    //Actualiza foto de usuario en documento de evento
    //en los seguidores al momento de cambiarla
    const userFollowingSnap = await userFollowingRef.get();
    userFollowingSnap.docs.forEach((docRef) => {
      let followingDocRef = db
        .collection('following')
        .doc(docRef.id)
        .collection('userFollowers')
        .doc(user?.uid);

      batch.update(followingDocRef, {
        photoUrl: photo.url,
      });
    });

    await batch.commit();

    return await user?.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    throw error;
  }
};

export const deletePhotoFromCollection = (photoId: string) => {
  const userUID = firebase.auth().currentUser?.uid;
  return db.collection('users').doc(userUID).collection('photos').doc(photoId).delete();
};

//get all events
export const fetchToEventsFromFirestore = (
  filter: string,
  startDate: Date,
  limit: number,
  lastDocSnapshot: any = null
) => {
  const user = firebase.auth().currentUser;
  let eventRef = db
    .collection('events')
    .orderBy('date')
    .startAfter(lastDocSnapshot)
    .limit(limit);
  //Basado en el predicate decide que mostrar
  switch (filter) {
    case 'isGoing':
      return eventRef
        .where('attendeeIds', 'array-contains', user?.uid)
        .where('date', '>=', startDate);
    case 'isHosting':
      return eventRef.where('hostUid', '==', user?.uid).where('date', '>=', startDate);
    default:
      return eventRef.where('date', '>=', startDate);
  }
};

//get an event
export const listenToEventFromFirestore = (eventId: string) => {
  return db.collection('events').doc(eventId);
};

//create a event
export const addEventToFirestore = (event: EventData) => {
  const user = firebase.auth().currentUser;
  return db.collection('events').add({
    ...event,
    hostUid: user?.uid,
    hostedBy: user?.displayName,
    hostPhotoURL: user?.photoURL || null,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user?.uid,
      name: user?.displayName,
      photoURL: user?.photoURL || null,
    }),
    attendeeIds: firebase.firestore.FieldValue.arrayUnion(user?.uid),
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

//Agregar usuario a evento
export const addUserAttendance = (event: EventData | undefined) => {
  const user = firebase.auth().currentUser;
  return db
    .collection('events')
    .doc(event?.id)
    .update({
      attendees: firebase.firestore.FieldValue.arrayUnion({
        id: user?.uid,
        name: user?.displayName,
        photoURL: user?.photoURL || null,
      }),
      attendeeIds: firebase.firestore.FieldValue.arrayUnion(user?.uid),
    });
};

//Remover usuario de evento
export const cancelUserAttendance = async (event: EventData | undefined) => {
  const user = firebase.auth().currentUser;
  try {
    const eventDoc = await db.collection('events').doc(event?.id).get();
    return db
      .collection('events')
      .doc(event?.id)
      .update({
        attendeeIds: firebase.firestore.FieldValue.arrayRemove(user?.uid),
        attendees: eventDoc
          .data()
          ?.attendees.filter((attendee: EventAttendee) => attendee.id !== user?.uid),
      });
  } catch (error) {
    throw error;
  }
};

//Obtener eventos de usuario
export const getUserEventsQuery = (
  activeTab: string | number | undefined,
  userUid: string
) => {
  let eventsRef = db.collection('events');
  const today = new Date();

  switch (activeTab) {
    //Eventos pasados
    case 1:
      return eventsRef
        .where('attendeeIds', 'array-contains', userUid)
        .where('date', '<=', today)
        .orderBy('date', 'desc');
    //Eventos hosteados por usuario
    case 2:
      return eventsRef.where('hostUid', '==', userUid).orderBy('date');

    default:
      return eventsRef
        .where('attendeeIds', 'array-contains', userUid)
        .where('date', '>=', today)
        .orderBy('date', 'asc');
  }
};

export const followUser = async (profile: any) => {
  const user = firebase.auth().currentUser;
  const batch = db.batch();

  try {
    batch.set(
      db
        .collection('following')
        .doc(user?.uid)
        .collection('userFollowing')
        .doc(profile.id),
      {
        displayName: profile?.displayName,
        photoURL: profile.photoURL,
        uid: profile.id,
      }
    );

    batch.update(db.collection('users').doc(user?.uid), {
      //Incrementar seguidores por 1
      followingCount: firebase.firestore.FieldValue.increment(1),
    });

    return await batch.commit();
  } catch (error) {
    throw error;
  }
};

export const unFollowUser = async (profile: any) => {
  const user = firebase.auth().currentUser;
  const batch = db.batch();

  try {
    batch.delete(
      db
        .collection('following')
        .doc(user?.uid)
        .collection('userFollowing')
        .doc(profile.id)
    );

    batch.update(db.collection('users').doc(user?.uid), {
      //Decrement seguidores por 1
      followingCount: firebase.firestore.FieldValue.increment(-1),
    });

    return await batch.commit();
  } catch (error) {
    throw error;
  }
};

export const getFollowersCollection = (profileId: any) => {
  return db.collection('following').doc(profileId).collection('userFollowers');
};

export const getFollowingCollection = (profileId: any) => {
  return db.collection('following').doc(profileId).collection('userFollowing');
};

export const getFollowingDoc = (profileId: any) => {
  const userUid = firebase.auth().currentUser?.uid;
  return db
    .collection('following')
    .doc(userUid)
    .collection('userFollowing')
    .doc(profileId)
    .get();
};
