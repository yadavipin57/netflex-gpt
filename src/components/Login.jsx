import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { MAIN_BG_IMG, USER_AVATAR } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const name = useRef(null);
  const email = useRef(null); // This will create an reference to input boxes. Reference is given in an object form.
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data
    if (isSignInForm) {
      // SIGN IN LOGIC
      const message = checkValidData(
        name === null,
        email.current.value,
        password.current.value
      );
      setErrorMessage(message);

      if (message) return; // If there is error in input fields then dont go below to the sign in code written below.

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // navigate("/browse")
          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode} - ${errorMessage}`);
        });
    } else {
      // SIGN UP LOGIC
      const message = checkValidData(
        name.current.value,
        email.current.value,
        password.current.value
      );
      setErrorMessage(message);

      if (message) return; // If there is error in input fields then dont go below to the sign in code written below.

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          navigate("/browse")
          // console.log(user);
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser; // This auth comes from firebase which has the updated values for the email, names etc
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode} - ${errorMessage}`);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="brightness-50"
          src={MAIN_BG_IMG}
          alt="Background-Image"
        />
      </div>
      <form
        className="absolute ml-[50%] transform -translate-x-[50%] mt-40 p-8 w-1/4 bg-black bg-opacity-80 rounded-sm text-white"
        onSubmit={(e) => e.preventDefault()}
        action=""
      >
        <h1 className="font-bold text-3xl">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            className="my-3 p-3 w-full rounded-sm bg-gray-500 bg-opacity-25 text-white"
            type="text"
            placeholder="Full Name"
            ref={name}
          />
        )}
        <input
          className="my-3 p-3 w-full rounded-sm bg-gray-500 bg-opacity-25 text-white"
          type="email"
          placeholder="Email Address"
          ref={email}
        />
        <input
          className="my-3 p-3 w-full rounded-sm bg-gray-500 bg-opacity-25 text-white"
          type="password"
          placeholder="Password"
          ref={password}
        />
        <p className="text-red-500 font-bold py-2">{errorMessage}</p>
        <button
          className="my-3 p-4 w-full bg-[#E50914] text-white rounded-sm"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="my-3 cursor-pointer hover:underline"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
