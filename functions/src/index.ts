import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

export const addFollowing = functions.firestore
  .document('following/{userUid}/userFollowing/{profileId}')
  .onCreate(async (snapshot, context) => {
    const following = snapshot.data();
    console.log({ following });
    try {
      const userDoc = await db.collection('users').doc(context.params.userUid).get();
      const batch = db.batch();

      batch.set(
        db
          .collection('following')
          .doc(context.params.profileId)
          .collection('userFollowers')
          .doc(context.params.userUid),
        {
          displayName: userDoc.data()!.displayName,
          photoURL: userDoc.data()!.photoURL,
          uid: userDoc.id,
        }
      );

      batch.update(db.collection('users').doc(context.params.profileId), {
        //Incrementar seguiendo por 1
        followerCount: admin.firestore.FieldValue.increment(1),
      });

      return await batch.commit();
    } catch (error) {
      return console.log(error);
    }
  });

export const removeFollowing = functions.firestore
  .document('following/{userUid}/userFollowing/{profileId}')
  .onDelete(async (snapshot, context) => {
    const batch = db.batch();
    batch.delete(
      db
        .collection('following')
        .doc(context.params.profileId)
        .collection('userFollowers')
        .doc(context.params.userUid)
    );

    batch.update(db.collection('users').doc(context.params.profileId), {
      //Decrement seguiendo por 1
      followerCount: admin.firestore.FieldValue.increment(-1),
    });

    try {
      return await batch.commit();
    } catch (error) {
      return console.error(error);
    }
  });

export const eventUpdated = functions.firestore
  .document('events/{eventId}')
  .onUpdate(async (snapshot, context) => {
    const before = snapshot.before.data();
    const after = snapshot.after.data();

    //Cuando alguien se une a evento
    if (before.attendees.length < after.attendees.length) {
      let attendeeJoined = after.attendees.filter(
        (item1: any) => !before.attendees.some((item2: any) => item2.id === item1.id)
      )[0];
      console.log({ attendeeJoined });

      try {
        const followerDocs = await db
          .collection('following')
          .doc(attendeeJoined.id)
          .collection('userFollowers')
          .get();

        followerDocs.forEach((doc) => {
          admin
            .database()
            .ref(`/posts/${doc.id}`)
            .push(
              newPost(attendeeJoined, 'joined-event', context.params.eventId, before)
            );
        });
      } catch (error) {
        return console.error(error);
      }
    }

    //Cuando alguien deja el evento
    if (before.attendees.length > after.attendees.length) {
      let attendeeLeft = before.attendees.filter(
        (item1: any) => !after.attendees.some((item2: any) => item2.id === item1.id)
      )[0];
      console.log({ attendeeLeft });

      try {
        const followerDocs = await db
          .collection('following')
          .doc(attendeeLeft.id)
          .collection('userFollowers')
          .get();

        followerDocs.forEach((doc) => {
          admin
            .database()
            .ref(`/posts/${doc.id}`)
            .push(newPost(attendeeLeft, 'left-event', context.params.eventId, before));
        });
      } catch (error) {
        return console.error(error);
      }
    }
    return console.log('DONE');
  });

const newPost = (user: any, code: any, eventId: any, event: any) => {
  console.log({ user });

  return {
    photoURL: user.photoURL,
    date: admin.database.ServerValue.TIMESTAMP,
    code,
    title: event.title,
    displayName: user.name,
    eventId,
    userUid: user.id,
  };
};
