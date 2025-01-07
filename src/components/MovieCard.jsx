import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { populateMovieId } from "../utils/movieDetailsSlice";
import { clearActorId } from "../utils/actorDetailsSlice";
import AddBoxIcon from "@mui/icons-material/AddBox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";

const MovieCard = ({
  movieId,
  posterPath,
  nameOfMovie,
  releaseDate,
  isWishlist,
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

  return (
    <div
      className="sm:m-2 p-2 cursor-pointer group sm:w-[200px] sm:h-[300px] relative"
      onClick={handleMovieClick}
    >
      <span
        className="absolute z-10 right-2 text-yellow-500 hover:scale-110"
        title={isWishlist ? "Add to watched":"Add to wishlist"}
      >
        {isWishlist ? <CheckIcon /> : <AddBoxIcon />}
      </span>
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
