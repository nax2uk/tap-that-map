import firebase from 'firebase/app'; // firebase utility library
import 'firebase/firebase-auth';
import 'firebase/database';
import firebaseConfig from './firebaseConfig';

const config = firebaseConfig;
firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.database();

export default firebase;
