import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        // navigate("/error")
      });
  };
  return (
    <div className="w-screen absolute px-8 py-2 z-10 flex justify-between">
      {" "}
      {/**bg-gradient-to-b from-black */}
      <img
        className="w-44"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
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
