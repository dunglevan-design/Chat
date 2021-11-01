import {
  ErrorMessage,
  ErrorMessageContainer,
  ErrorMessageLogo,
  LoginBoard,
  LoginButton,
  Loginlogo,
  Message,
  Providerlogo,
  ReportButton,
} from "./LoginElements";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, Facebookprovider, Googleprovider } from "../../firebase";
import { useContext, useEffect, useState } from "react";
import { context } from "../../Globals/GlobalStateProvider";
import Errorsvg from "../../images/Error.svg";
import { createAvatar } from "@dicebear/avatars";
import * as style from '@dicebear/micah';

const Login = () => {
  const { dispatch } = useContext(context);
  const [error, setError] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // console.log(JSON.stringify(user));
          let svg = createAvatar(style, {
              seed: user.uid,
          })
          const svgsrc = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
          if (user.displayName === null){
            dispatch({
              type:"SET_USER",
              user: {...user, photoURL: svgsrc, displayName : "anonymous"}
            });
          }
          else {
            dispatch({
              type: "SET_USER",
              user: {...user, photoURL: svgsrc},
            });
          }
          // ...
        } else {
          dispatch({
            type: "SET_USER",
            user: null,
          });
        }
      });
  }, [])
 
  //   const ErrorFunc = async () => {
  //     throw new Error("Test error has occured");
  //   };
  const LoginWithGoogle = () => {
    signInWithPopup(auth, Googleprovider).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      //const email = error.email;
      // The AuthCredential type that was used.
      //const credential = GoogleAuthProvider.credentialFromError(error);
      //
      setError(errorCode + ": " + errorMessage);
    });
  };

  const LoginWithFacebook = () => {
    signInWithPopup(auth, Facebookprovider).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      //const email = error.email;
      // The AuthCredential type that was used.
      //const credential = FacebookAuthProvider.credentialFromError(error);
      // ...
      setError(errorCode + ": " + errorMessage);
    });
  };

  const LoginAsGuest = () => {
    signInAnonymously(auth).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
      setError(errorCode + ": " + errorMessage);
    });
  };
  return (
    <>
      <LoginBoard>
        {!error ? (
          <>
            <Loginlogo></Loginlogo>
            <LoginButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => LoginWithGoogle()}
            >
              Log in with Google
              <Providerlogo name="Google"></Providerlogo>
            </LoginButton>
            <LoginButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => LoginWithFacebook()}
            >
              Log in with Facebook
              <Providerlogo name="Facebook"></Providerlogo>
            </LoginButton>
            <LoginButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => LoginAsGuest()}
            >
              Log in as Guest
              <Providerlogo name="Guest"></Providerlogo>
            </LoginButton>
          </>
        ) : (
          <ErrorMessageContainer>
            <ErrorMessageLogo src={Errorsvg}></ErrorMessageLogo>
            <ErrorMessage>OOps! {error}</ErrorMessage>
            <Message>
              Please reload the page and use a different login method
            </Message>
            <ReportButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              Report this to us !
            </ReportButton>
          </ErrorMessageContainer>
        )}
      </LoginBoard>
    </>
  );
};

export default Login;
