import { toast } from 'react-toastify';
import { AuthPayload } from './../actions/auth';
import { firebase } from '../config/firebase';
import { setUserProfileData } from './firestoreService';

export type SelectedProviders = 'FacebookAuthProvider' | 'GoogleAuthProvider';

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
