// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWjcnE8XmJq3Bci5yerkOk89F9yEn7pKM",
  authDomain: "mitlabshut-final.firebaseapp.com",
  projectId: "mitlabshut-final",
  storageBucket: "mitlabshut-final.appspot.com",
  messagingSenderId: "827006604270",
  appId: "1:827006604270:web:32d8d8a4142940b7a974ff",
  measurementId: "G-M0FJ05K5DB",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
// const app = initializeApp(firebaseConfig);

// export { app, firebase };
