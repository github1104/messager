import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import firebase from "firebase";
window.store = store;
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
const storeage = firebase.storage();
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
