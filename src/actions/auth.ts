import { ListenCurrentProfile } from './profile';
import { signInWithEmail, signOutFirebase } from './../firestore/firebaseService';
import { firebase } from '.././config/firebase';
import { Dispatch } from 'redux';
import { types } from './types';
import { dataFromSnapshot, getUserProfileData } from '../firestore/firestoreService';

export interface AuthPayload extends Partial<firebase.auth.UserCredential> {
  uid?: any;
  id?: any;
  email: string;
  password: string;
  displayName?: string;
  photoURL?: string;
  providerId?: string;
  createdAt?: Date;
  description?: string;
}

export interface SignInAction {
  type: types.SIGNED_IN;
  payload: firebase.User | null;
}

export interface SignOutAction {
  type: types.SIGNED_OUT;
}

export const signInUser = (creds: AuthPayload) => {
  return async (dispatch: Dispatch) => {
    try {
      const { user } = await signInWithEmail(creds);
      console.log(user);

      dispatch<SignInAction>({ type: types.SIGNED_IN, payload: user });
    } catch (error) {
      throw error;
    }
  };
};

export const signOutUser = () => {
  return async (dispatch: Dispatch) => {
    try {
      await signOutFirebase();
      dispatch<SignOutAction>({ type: types.SIGNED_OUT });
    } catch (error) {
      throw error;
    }
  };
};

//continuamente escucha estado de autenticacion y la persiste
//sin necesidad de escribir el localstorage
export const verifyAuth = () => {
  return (dispatch: Dispatch) => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch<SignInAction>({ type: types.SIGNED_IN, payload: user });
        const profileRef = getUserProfileData(user.uid);
        profileRef.onSnapshot((snapshot) => {
          dispatch(ListenCurrentProfile(dataFromSnapshot(snapshot)));
        });
      } else {
        dispatch<SignOutAction>({ type: types.SIGNED_OUT });
      }
    });
  };
};
