require("dotenv").config();
// this is the correct config for our team repo

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "tap-that-map.firebaseapp.com",
  databaseURL: "https://tap-that-map.firebaseio.com",
  projectId: "tap-that-map",
  storageBucket: "tap-that-map.appspot.com",
  messagingSenderId: "1010705944428",
  appId: "1:1010705944428:web:c6fabe4129065c0604ad49",
  measurementId: "G-6CWLR44LYP",
};

export default firebaseConfig;
