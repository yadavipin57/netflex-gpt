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
import { useLocation } from "react-router-dom";
import { movieDetailsViewFalse } from "../utils/movieDetailsSlice";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const langKey = useSelector((store) => store.config.lang);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);

  const location = useLocation();

  const isAuthPage = location.pathname === "/";

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

  const handleMenuClick = () => {
    setIsMenuClicked((prev) => !prev);
  };

  const handleGPTSearchClick = () => {
    // Toggle GPT Search
    setIsMenuClicked(false);
    dispatch(toggleGPTSearchView());
    dispatch(movieDetailsViewFalse());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div
      className={`w-screen p-2 md:pb-0 absolute top-0 bg-black ${
        isAuthPage ? "bg-transparent" : "bg-transparent"
      } text-lg md:text-lg md:px-12 md:py-2 z-10 flex flex-row justify-between`}
    >
      {/**bg-gradient-to-b from-black */}
      <div className="w-fit">
        <img
          className={`w-24 md:w-44 mx-auto md:mx-0 ${
            isAuthPage ? "w-[144px]" : ""
          } `}
          src={LOGO}
          alt="Netflix Logo"
        />
      </div>
      <div>
        {user && (
          <div
            className="block md:hidden text-white cursor-pointer "
            onClick={handleMenuClick}
          >
            {isMenuClicked ? <CloseIcon /> : <MenuIcon />}
          </div>
        )}
        <div className={`${isMenuClicked ? "flex" : "hidden"} md:block`}>
          {user && (
            <div className="w-fit flex flex-col sm:flex-row items-start sm:items-center justify-evenly">
              <div className="flex items-center">
                <img
                  className="mx-2 w-8 h-8 md:mx-4 md:w-12 md:h-12 rounded-full"
                  src={user.photoURL}
                  alt="User Icon"
                />
                <span className="text-white">{user.displayName}</span>
              </div>
              {showGPTSearch && (
                <select
                  className="m-1 p-1 md:m-2 md:p-2 w-full sm:w-auto rounded-lg cursor-pointer bg-gray-900 text-white"
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
                </select>
              )}
              <button
                className="m-1 p-1 md:m-2 md:p-2 w-full sm:w-auto text-sm md:text-base text-white rounded-lg bg-[#D9232E]"
                onClick={handleGPTSearchClick}
              >
                {showGPTSearch ? lang[langKey].home : lang.en.gptSearchButton}
              </button>
              <button
                className="m-1 p-1 md:m-2 md:p-2 w-full sm:w-auto text-sm md:text-base text-white rounded-lg bg-[#D9232E]"
                onClick={handleSignOut}
              >
                {showGPTSearch ? lang[langKey].signOut : lang.en.signOut}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
