// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
