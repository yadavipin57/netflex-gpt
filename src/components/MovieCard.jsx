import React, { useState } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { populateMovieId } from "../utils/movieDetailsSlice";
import { clearActorId } from "../utils/actorDetailsSlice";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { ref, remove, set } from "firebase/database";
import { auth, db } from "../utils/firebase.js"; // Firebase setup
import { toast } from "react-toastify";
import { getRandomNumber } from "../utils/userSlice.js";

const MovieCard = ({
  movieId,
  posterPath,
  nameOfMovie,
  releaseDate,
  isWishlist,
  isWatchlist,
}) => {
  const dispatch = useDispatch();

  const releaseDateArray = releaseDate.split("-");
  const releaseMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleMovieClick = () => {
    dispatch(clearActorId());
    dispatch(populateMovieId(movieId));
  };

  const movieInfoForWishlist = {
    movieId,
    posterPath,
    nameOfMovie,
    releaseDate,
  };

  const addToWishlist = () => {
    const userId = auth?.currentUser?.uid;
    const movieWishRef = ref(db, `users/${userId}/wishlist/${movieId}`);

    set(movieWishRef, movieInfoForWishlist)
      .then(() => {
        toast.success(`${nameOfMovie} has been added to your wishlist!`);
      })
      .catch((error) => {
        console.log("Error adding movie to wishlist:", error);
        toast.error(
          `${nameOfMovie} cannot be added to the wishlist due to some reason!`
        );
      });
  };

  const addToWatchedList = () => {
    const userId = auth?.currentUser?.uid;
    const movieWatchRef = ref(db, `users/${userId}/watchedlist/${movieId}`);
    const movieWishRef = ref(db, `users/${userId}/wishlist/${movieId}`);

    set(movieWatchRef, movieInfoForWishlist)
      .then(() => {
        toast.success(
          `${nameOfMovie} has been added to your watchedlist! Kindly refresh the page.`
        );
      })
      .catch((error) => {
        console.log("Error adding movie to watchedlist:", error);
        toast.error(
          `${nameOfMovie} cannot be added to the watchedlist due to some reason!`
        );
      });

    remove(movieWishRef);

    const randomNumber = Math.random();
    dispatch(getRandomNumber(randomNumber));
  };

  const deleteWatchedList = () => {
    const userId = auth?.currentUser?.uid;
    const movieWatchRef = ref(db, `users/${userId}/watchedlist/${movieId}`);
    remove(movieWatchRef).then(() => {
      toast.success(
        `${nameOfMovie} has been deleted. Refresh the page to see the change.`
      );
    });

    const randomNumber = Math.random();
    dispatch(getRandomNumber(randomNumber));
  };

  return (
    <div
      className="sm:m-2 p-2 cursor-pointer group sm:w-[200px] sm:h-[300px] relative"
      onClick={handleMovieClick}
    >
      <div
        className="absolute z-10 right-2 hover:scale-110"
        title={
          isWishlist
            ? "Add to watched"
            : isWatchlist
            ? "Delete"
            : "Add to wishlist"
        }
      >
        {isWishlist ? (
          <span
            className="text-green-500"
            onClick={(e) => {
              e.stopPropagation();
              addToWatchedList();
            }}
          >
            <CheckBoxIcon />
          </span>
        ) : isWatchlist ? (
          <span
            className="text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              deleteWatchedList();
            }}
          >
            <DeleteIcon />
          </span>
        ) : (
          <span
            className="text-yellow-500"
            onClick={(e) => {
              e.stopPropagation();
              addToWishlist();
            }}
          >
            <AddBoxIcon />
          </span>
        )}
      </div>
      {/* <span className="absolute z-10 bottom-2 right-2 text-yellow-500 hover:scale-110" title="Add to watched list"><VisibilityIcon/></span> */}

      {/* Image */}
      <img
        className="w-full h-full object-cover  aspect-auto  transform transition-transform duration-300 group-hover:scale-105 group-hover:brightness-[0.4]  rounded-md"
        src={IMG_CDN_URL + posterPath}
        alt={nameOfMovie}
      />

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-start mx-1 md:px-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="font-bold text-lg md:text-3xl">{nameOfMovie}</h3>
        <p className="text-sm font-bold">{`${
          releaseMonth[releaseDateArray?.[1] - 1]
        } ${releaseDateArray?.[2]}, ${releaseDateArray?.[0]}`}</p>
      </div>
    </div>
  );
};

export default MovieCard;
