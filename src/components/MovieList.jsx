import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="mx-1 md:px-6 md:py-3">
      <div>
        <h1 className="pb-1 md:pb-3 font-bold text-white text-lg md:text-xl">
          {title}
        </h1>
        <div className=" flex gap-1 md:gap-5 overflow-y-hidden overflow-x-auto">
          {movies &&
            movies.map((movie) => {
              if (!movie?.poster_path) return null;
              return (
                <div
                  className="flex-shrink-0 w-[45%] md:w-[200px]"
                  key={movie.id}
                >
                  <MovieCard
                    movieId={movie?.id}
                    posterPath={movie.poster_path}
                    nameOfMovie={movie?.title}
                    releaseDate={movie.release_date}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
