// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAF-UN1LEbh6ENgYvKBbftdwoeCxmBsZFQ",
  authDomain: "mitlabshut-ee371.firebaseapp.com",
  projectId: "mitlabshut-ee371",
  storageBucket: "mitlabshut-ee371.appspot.com",
  messagingSenderId: "997564396755",
  appId: "1:997564396755:web:8af5839586676e13281026",
  measurementId: "G-SDE7P6F41B",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCUPrlQKiTpCKuzww52TyiEkwqfbUCvnnE",
//   authDomain: "tryyy-978b2.firebaseapp.com",
//   projectId: "tryyy-978b2",
//   storageBucket: "tryyy-978b2.appspot.com",
//   messagingSenderId: "766081137343",
//   appId: "1:766081137343:web:15bfacc5fe4b5a34b0e40a",
//   measurementId: "G-KBE588WE9Z",
// };



// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
// const app = initializeApp(firebaseConfig);

// export { app, firebase };
