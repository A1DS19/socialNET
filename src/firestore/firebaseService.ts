import { toast } from 'react-toastify';
import { AuthPayload } from './../actions/auth';
import { firebase } from '../config/firebase';
import { setUserProfileData } from './firestoreService';

export type SelectedProviders = 'FacebookAuthProvider' | 'GoogleAuthProvider';

export const uploadFirebaseStorage = (file: File, filename: string) => {
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();
  //crear referencia con datos de usuario
  return storageRef.child(`${user?.uid}/user_images/${filename}`).put(file);
};

export const deleteFromFirestoreStorage = (filename: string) => {
  const userUID = firebase.auth().currentUser?.uid;
  const storageRef = firebase.storage().ref();
  const photoRef = storageRef.child(`${userUID}/user_images/${filename}`);
  return photoRef.delete();
};

export const getUserNewsFeedRef = () => {
  const user = firebase.auth().currentUser;
  return firebase.database().ref(`posts/${user?.uid}`).orderByKey().limitToLast(5);
};

export const signInWithEmail = (creds: AuthPayload) => {
  return firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
};

export const signOutFirebase = () => {
  return firebase.auth().signOut();
};

export const socialLogin = async (providerId: SelectedProviders) => {
  let provider;

  if (providerId === 'FacebookAuthProvider') {
    provider = new firebase.auth.FacebookAuthProvider();
  }

  if (providerId === 'GoogleAuthProvider') {
    provider = new firebase.auth.GoogleAuthProvider();
  }

  if (provider === undefined) {
    return;
  }

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    console.log(result);

    //Crear usuario nuevo si no existia antes
    if (result.additionalUserInfo?.isNewUser) {
      await setUserProfileData(result.user);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const changeUserPassword = (creds: { newPassword1: string }) => {
  //Usuario actual
  const user = firebase.auth().currentUser;
  return user?.updatePassword(creds.newPassword1);
};

export const registerFirebase = async ({ email, password, displayName }: AuthPayload) => {
  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await user?.updateProfile({ displayName });
    await setUserProfileData(user);
  } catch (error) {
    throw error;
  }
};

export const addEventChatComment = (eventId: any, values: any) => {
  const user = firebase.auth().currentUser;
  const newComment = {
    displayName: user?.displayName,
    photoUrl: user?.photoURL,
    uid: user?.uid,
    text: values.comment,
    date: Date.now(),
    parentId: values.parentId,
  };
  return firebase.database().ref(`chat/${eventId}`).push(newComment);
};

export const getEventChatRef = (eventId?: any) => {
  return firebase.database().ref(`chat/${eventId}`).orderByKey();
};

export const firebaseObjectToArray = (snapshot: any) => {
  if (snapshot) {
    return Object.entries(snapshot).map((e) => Object.assign({}, e[1], { id: e[0] }));
  }
};
