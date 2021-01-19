import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCRFsufxDhfDWgeYaDQm-i0YZOOOxcw-aU',
  authDomain: 'socialnet-301802.firebaseapp.com',
  projectId: 'socialnet-301802',
  storageBucket: 'socialnet-301802.appspot.com',
  messagingSenderId: '714286158858',
  appId: '1:714286158858:web:6028f9e785be7380eb3bf3',
  measurementId: 'G-SSYKZWZ2TY',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export { firebase };
