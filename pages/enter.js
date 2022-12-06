/* eslint-disable react-hooks/exhaustive-deps */
import debounce from "lodash.debounce";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../library/context";
import { auth, firestore, googleAuthProvider } from "../library/firebase";

export default function Enter(props) {
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
function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, username } = useContext(UserContext);
  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);
  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9.]{3,15}$)(?!.*[.]{2})[^.].*[^.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  async function onSubmit(e) {
    e.preventDefault();
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });
    try {
      await batch.commit();
    } catch (error) {
      console.log(error);
    }
  }

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const userRef = firestore.doc(`usernames/${username}`);
        const { exist } = await userRef.get();
        console.log("firestore read executed");
        setIsValid(!exist);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h3>choose username</h3>
        <form onSubmit={onSubmit}>
          <input
            name='username'
            placeholder='username'
            value={formValue}
            onChange={onChange}></input>
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <button type='submit' disabled={!isValid}>
            choose
          </button>
          <h4>debug</h4>
          <div>
            username : {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className='text-success'>{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className='text-danger'>That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
