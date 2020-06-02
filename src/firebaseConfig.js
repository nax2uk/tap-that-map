require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "tapthatmapgame.firebaseapp.com",
  databaseURL: "https://tapthatmapgame.firebaseio.com",
  projectId: "tapthatmapgame",
  storageBucket: "tapthatmapgame.appspot.com",
  messagingSenderId: "238825578761",
  appId: "1:238825578761:web:b83c13f105cf85167eb3d8",
  measurementId: "G-DZE2DMZTLB",
};

export default firebaseConfig;
