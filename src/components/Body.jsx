import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import Wishlist from "./Wishlist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/wishlist",
      element: <Wishlist />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
      <ToastContainer className="p-1 z-[100]" position="bottom-right" autoClose={1000} />
    </div>
  );
};

export default Body;

// Formic is library for validation of form inputs.

// Because of StrictMode most of the things happens twice but only in Development.

// Episode 16
