import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 py-3">
      <div>
        <h1 className="pb-3 font-bold text-white text-xl">{title}</h1>
        <div className="flex gap-5 overflow-x-auto">
          {movies && movies.map((movie) => (
            <div className="flex-shrink-0 w-[200px]" key={movie.id}>
            <MovieCard posterPath={movie.poster_path} />
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
