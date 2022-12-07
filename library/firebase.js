





import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDmdRYO_wSnJ_r7Qu_663muFHuXyuEy3Xg",
  authDomain: "nextfire-600c7.firebaseapp.com",
  projectId: "nextfire-600c7",
  storageBucket: "nextfire-600c7.appspot.com",
  messagingSenderId: "801470718437",
  appId: "1:801470718437:web:401af3f824dc93c0bccf0c",
  measurementId: "G-SK83PLECDV",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const fromMillies = firebase.firestore.Timestamp.fromMillis

export const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp


export async function getUserWithUsername(username){
  const usersRef = firestore.collection("users")
  const query = usersRef.where("username", '==', username).limit(1)
  const userDoc = (await query.get()).docs[0]
  return userDoc
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
