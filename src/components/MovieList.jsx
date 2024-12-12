import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({title, movies }) => {

  // console.log(movies);
  // console.log(movies.map((movie)=>movie.vote_average))
  return (
    <div className="mx-1 md:px-6 md:py-3">
      <div>
        <h1 className="pb-1 md:pb-3 font-bold text-white text-lg md:text-xl">{title}</h1>
        <div className="flex gap-1 md:gap-5 overflow-x-auto">
          {movies && movies.map((movie) => (
            <div className="flex-shrink-0 w-[32.5%] md:w-[200px]" key={movie.id}>
            <MovieCard posterPath={movie.poster_path} nameOfMovie={movie.original_title} releaseDate={movie.release_date}/>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
