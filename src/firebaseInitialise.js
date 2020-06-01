import firebase from 'firebase/app'; // firebase utility library
import 'firebase/firebase-auth';
import 'firebase/database';
import 'firebase/storage';
import firebaseConfig from './firebaseConfig';

const config = firebaseConfig;
firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage();

export default firebase;
