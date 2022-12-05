import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { UserContext } from "../library/context";
import "../styles/globals.css";
import { use, useEffect, useState } from "react";
import { auth, firestore } from "../library/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { useUserData } from "../library/hooks";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
