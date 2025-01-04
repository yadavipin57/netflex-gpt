import React from "react";
import TVCard from "./TVCard";

const TVList = ({showType, title, movies }) => {
  
  return (
    <div className="mx-1 md:px-6 md:py-3">
      <div>
        <h1 className="pb-1 md:pb-3 font-bold text-white text-lg md:text-xl">{title}</h1>
        <div className=" flex gap-1 md:gap-5 overflow-y-hidden overflow-x-auto">
          {movies && movies.map((movie) => (
            <div className="flex-shrink-0 w-[45%] md:w-[200px]" key={movie.id}>
            <TVCard movieId={movie?.id} posterPath={movie.poster_path} nameOfMovie={movie?.title} releaseDate={movie.release_date}/>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVList;
