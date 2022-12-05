import { useContext } from "react";
import { UserContext } from "../library/context";
import { auth, googleAuthProvider } from "../library/firebase";

export default function Enter(props){
  const { user, username } = useContext(UserContext);
  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

function SignInButton() {
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={signInWithGoogle}>sign in with google</button>;
}

function SignOutButton() {
  return <button onClick={() => auth.signOut()}>sign out</button>;
}
function UsernameForm() {}
