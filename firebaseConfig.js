import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAt1b2u1JfJ1L2Wloz9jYDcZI3WRrW4qgI",
  authDomain: "mitlabshut-b53e9.firebaseapp.com",
  projectId: "mitlabshut-b53e9",
  storageBucket: "mitlabshut-b53e9.appspot.com",
  messagingSenderId: "946523654428",
  appId: "1:946523654428:web:7295063651cee54875d2d9",
  measurementId: "G-2L0P4HZWLR",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const auth = firebase.auth(firebaseApp);
// const firestore = getFirestore(firebaseApp);
// const analytics = getAnalytics(firebaseApp);
const storage = getStorage(firebaseApp);

// export { firebaseApp, auth, firestore, analytics, storage };
export { firebaseApp};
