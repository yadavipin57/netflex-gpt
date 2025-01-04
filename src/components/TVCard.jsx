import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {
  populateMovieId,
  toggleMovieDetailsView,
} from "../utils/movieDetailsSlice";
import { clearActorId, toggleActorDetailsView } from "../utils/actorDetailsSlice";

const TVCard = ({ movieId, posterPath, nameOfMovie, releaseDate }) => {
  const dispatch = useDispatch();

  if (!posterPath) return null;

  // console.log(nameOfMovie)

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

  const handleTVClick = () => {
    dispatch(clearActorId());
    dispatch(toggleMovieDetailsView());
    dispatch(populateMovieId(movieId));
  };

  return (
    <div
      className="sm:m-2 p-2  relative cursor-pointer group sm:w-[200px] sm:h-[300px] "
      onClick={handleTVClick}
    >
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

export default TVCard;
