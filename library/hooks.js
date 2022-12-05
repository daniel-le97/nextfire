
import { useEffect, useState } from "react";
import { auth, firestore } from "../library/firebase";

import { useAuthState } from "react-firebase-hooks/auth";

export function useUserData(){
   const [user] = useAuthState(auth);
   const [username, setUsername] = useState(null);
   useEffect(() => {
     let unsubscribe;
     if (user) {
       const userRef = firestore.collection("users").doc(user.uid);
       unsubscribe = userRef.onSnapshot((doc) => {
         setUsername(doc.data()?.username);
       });
     } else {
       setUsername(null);
     }
     return unsubscribe;
   }, [user]);
   return {user, username}
}