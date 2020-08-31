import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAcI9iwVdyn-szxXmzIcwz3TcvFSYS0k9k",
  authDomain: "messenger-clone-afef7.firebaseapp.com",
  databaseURL: "https://messenger-clone-afef7.firebaseio.com",
  projectId: "messenger-clone-afef7",
  storageBucket: "messenger-clone-afef7.appspot.com",
  messagingSenderId: "849228743018",
  appId: "1:849228743018:web:2d2d22b71bafff9b4c6513",
  measurementId: "G-C4HHX1GJ2H",
});

const db = firebaseApp.firestore();

export default db;
