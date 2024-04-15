// firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBSU70NFh3USzDmx8SsRon2UUZ2aBfFQMI",
  authDomain: "ajou-event.firebaseapp.com",
  projectId: "ajou-event",
  storageBucket: "ajou-event.appspot.com",
  messagingSenderId: "605779034389",
  appId: "1:605779034389:web:d3f7dd041db696dffba91c",
  measurementId: "G-1XHZ65LFSE",
};

const firebaseApp = initializeApp(firebaseConfig);
export { firebaseApp };
