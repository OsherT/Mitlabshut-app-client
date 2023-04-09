// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAF-UN1LEbh6ENgYvKBbftdwoeCxmBsZFQ",
  
//   authDomain: "mitlabshut-ee371.firebaseapp.com",
//   projectId: "mitlabshut-ee371",
//   storageBucket: "mitlabshut-ee371.appspot.com",
//   messagingSenderId: "997564396755",
//   appId: "1:997564396755:web:8af5839586676e13281026",
//   measurementId: "G-SDE7P6F41B",
// };
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
