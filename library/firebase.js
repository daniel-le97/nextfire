import firebase from "firebase/app";
import "firebase/compat/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDmdRYO_wSnJ_r7Qu_663muFHuXyuEy3Xg",
  authDomain: "nextfire-600c7.firebaseapp.com",
  projectId: "nextfire-600c7",
  storageBucket: "nextfire-600c7.appspot.com",
  messagingSenderId: "801470718437",
  appId: "1:801470718437:web:401af3f824dc93c0bccf0c",
  measurementId: "G-SK83PLECDV",
};

if (!firebase.getApps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
