import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const GPTMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);

  if (!movieNames) return null; // Do error handling

  return (
    <div className="m-2 p-2 md:m-4 md:p-4 bg-black bg-opacity-25 text-white">
      <div>
        {movieNames.map((movieName, index) => (
            <MovieList key={index} title={movieName} movies={movieResults[index]}/>
        ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggestions;
