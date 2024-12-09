import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import lang from "../utils/languageConstans";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const langKey = useSelector(store => store.config.lang);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        // navigate("/error")
      });
  };

  useEffect(() => {
    // Because we want to do it for once that's why we are using useEffect()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // This is Sign In case
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        ); // Putting the uid, email, displayName into the store. As much data as much we want
        navigate("/browse");
      } else {
        // This is Sign Out case
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe(); // Unsubscribing the onAuthStateChange() when the header unmounts. The fn should be returned and not invoked immidietly otherwise it won't work
  }, []);

  const handleGPTSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGPTSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="w-screen absolute px-12 py-2 z-10 flex justify-between">
      {/**bg-gradient-to-b from-black */}
      <img className="w-44" src={LOGO} alt="Netflix Logo" />
      {user && (
        <div className="flex items-center">
          {showGPTSearch && <select
            className="m-2 p-2 rounded-lg cursor-pointer bg-gray-900 text-white"
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option
                className=""
                key={lang.identifier}
                value={lang.identifier}
              >
                {lang.name}
              </option>
            ))}
          </select>}
          <button
            className="py-2 px-4 text-white rounded-lg bg-[#D9232E]"
            onClick={handleGPTSearchClick}
          >
            {showGPTSearch ? lang[langKey].home : lang.en.gptSearchButton}
          </button>
          <img
            className="mx-4 w-12 h-12 rounded-full"
            src={user.photoURL}
            alt="User Icon"
          />
          <button
            className="py-2 px-4 text-white rounded-lg bg-[#D9232E]"
            onClick={handleSignOut}
          >
            {showGPTSearch ? lang[langKey].signOut : lang.en.signOut}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
