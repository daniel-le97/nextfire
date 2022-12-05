import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { UserContext } from "../library/context";
import "../styles/globals.css";
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
