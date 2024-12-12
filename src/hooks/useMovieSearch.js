import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addAPIMovieResult } from "../utils/gptSlice";
import client from "../utils/groqAPI";

const useMovieSearch = (searchText) => {
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    // console.log(json.results);

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

    // console.log(movieResults.choices?.[0]?.message?.content);

    const movieListArray =
      movieResults.choices?.[0]?.message?.content.split(",");

    // For each movie I will search TMDB

    const promiseArray = movieListArray.map((movie) => searchMovieTMDB(movie));
    // Above line gives array of promises [Primise1, Promise2...]

    const tmdbResults = await Promise.all(promiseArray); //When you use Promise.all(promiseArray), you wait for all the Promise objects in promiseArray to resolve. This:
    //Fails as a whole if any one of the promises rejects (though you can handle individual rejections if needed using Promise.allSettled).

    // console.log(tmdbResults);

    dispatch(
      addAPIMovieResult({
        movieNames: movieListArray,
        movieResults: tmdbResults,
      })
    );

    // Make an API call to GPT API to get the movie results
    // const gptResults = await openai.chat.completions.create({
    //   messages: [{role: "user", content: movieQuery}],
    //   model: "gpt-3.5-turbo",
    // });
    // console.log(gptResults.choices);
  };
  return { triggerSearch: handleGPTSearchClick };
};

export default useMovieSearch;
