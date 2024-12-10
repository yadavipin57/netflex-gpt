import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstans";
import { useRef } from "react";
import client from "../utils/groqAPI";
import { addAPIMovieResult } from "../utils/gptSlice";
import { API_OPTIONS } from "../utils/constants";

const GPTSearchBar = () => {

  const dispatch = useDispatch();

  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGPTSearchClick = async () => {
    const movieQuery =
      "Act as a Movie Recommendation system and suggest only the names of " +
      searchText.current.value +
      " at most 10 movies ,space and comma-separated no extra text, no explanations. Example result: 'Movie1, Movie2, ...'. Just provide the movie names nothing else.";

    // Make an API call to Groq API to get movie results

    const movieResults = await client.chat.completions.create({
      messages: [{ role: "user", content: movieQuery }],
      model: "llama3-8b-8192",
    });

    if (!movieResults.choices[0]) {
      // TODO: Write Error Handling
    }

    console.log(movieResults.choices?.[0]?.message?.content);

    const movieListArray = movieResults.choices?.[0]?.message?.content.split(",");

    // For each movie I will search TMDB

    const promiseArray = movieListArray.map(movie => searchMovieTMDB(movie))
    // Above line gives array of promises [Primise1, Promise2...]

    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);

    dispatch(addAPIMovieResult({movieNames: movieListArray, movieResults: tmdbResults}));


    // Make an API call to GPT API to get the movie results
    // const gptResults = await openai.chat.completions.create({
    //   messages: [{role: "user", content: movieQuery}],
    //   model: "gpt-3.5-turbo",
    // });
    // console.log(gptResults.choices);
  };

  return (
    <div className="pt-[5%] flex justify-center">
      <form
        className="bg-black bg-opacity-50 rounded-lg w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={searchText}
          className="p-4 m-4 col-span-10 rounded-lg outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent"
          placeholder={lang[langKey].gptSearchPlceholder}
        />
        <button
          className="m-4 py-4 px-4 bg-[#D9232E] cursor-pointer text-white pointer rounded-lg col-span-2"
          onClick={handleGPTSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
