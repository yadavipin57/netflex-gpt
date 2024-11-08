import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

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
          />
        )}
        <input
          className="my-3 p-3 w-full rounded-sm bg-gray-500 bg-opacity-25 text-white"
          type="email"
          placeholder="Email Address"
        />
        <input
          className="my-3 p-3 w-full rounded-sm bg-gray-500 bg-opacity-25 text-white"
          type="password"
          placeholder="Password"
        />
        <button className="my-3 p-4 w-full bg-[#E50914] text-white rounded-sm">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="my-3 cursor-pointer hover:underline" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
