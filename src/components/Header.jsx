import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
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

  useEffect(()=>{ // Because we want to do it for once that's why we are using useEffect()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) { // This is Sign In case
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL})); // Putting the uid, email, displayName into the store. As much data as much we want
        navigate("/browse")
      } else { // This is Sign Out case
        dispatch(removeUser());
        navigate("/")
      }
    });
    
    return unsubscribe(); // Unsubscribing the onAuthStateChange() when the header unmounts.
  }, [])

  return (
    <div className="w-screen absolute px-8 py-2 z-10 flex justify-between">
      {" "}
      {/**bg-gradient-to-b from-black */}
      <img
        className="w-44"
        src={LOGO}
        alt="Netflix Logo"
      />
      {user && (
        <div className="flex items-center">
          <img className="mx-4 w-12 h-12 rounded-full" src={user.photoURL} alt="User Icon" />
          <button
            className="p-2 text-white rounded-lg bg-[#D9232E]"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
