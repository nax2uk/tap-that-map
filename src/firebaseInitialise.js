/*import firebaseConfig from "./firebaseConfig";
import * as firebase from "firebase";

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
export const auth = firebase.auth();

export default database;
*/

import firebase from 'firebase/app'; // firebase utility library
//import 'firebase/firestore';
import 'firebase/firebase-auth';
import 'firebase/database';
import firebaseConfig from './firebaseConfig';

const config = firebaseConfig;
firebase.initializeApp(config);

export const auth = firebase.auth();
//export const firestore = firebase.firestore();
export const database = firebase.database();
//const provider = new firebase.auth.GoogleAuthProvider();
//provider.setCustomParameters({ prompt: 'select_account' });
//export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
