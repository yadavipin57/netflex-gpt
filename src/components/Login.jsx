import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          console.log(user);
          navigate("/browse");
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
          console.log(user);
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s",
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
              navigate("/browse");
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
          src="https://assets.nflxext.com/ffe/siteui/vlv3/81d64f3c-9627-4741-8f74-422bf35f9f1d/web/IN-en-20241104-TRIFECTA-perspective_55263ea2-af7f-40ed-9cf0-7029a9b9baf4_small.jpg"
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
