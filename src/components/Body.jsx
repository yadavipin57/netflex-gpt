import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Body = () => {

  const dispatch = useDispatch();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  useEffect(()=>{ // Because we want to do it for once that's why we are using useEffect()
    onAuthStateChanged(auth, (user) => {
      if (user) { // This is Sign In case
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL})); // Putting the uid, email, displayName into the store. As much data as much we want
      } else { // This is Sign Out case
        dispatch(removeUser());
      }
    });
    
  }, [])

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;

// Formic is library for validation of form inputs.

