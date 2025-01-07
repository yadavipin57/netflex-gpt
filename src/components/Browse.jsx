import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GPTSearch from "./GPTSearch";
import { useSelector } from "react-redux";
import MovieDetails from "./MovieDetails";
import ActorDetails from "./ActorDetails";
import TVDetails from "./TVDetails";
import Footer from "./Footer";

const Browse = () => {
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
  const movieIdFromStore = useSelector((store) => store.movieDetails.movieId);
  const actorIdFromStore = useSelector((store) => store.actorDetails.actorId);
  const tvShowIdFromStore = useSelector(
    (store) => store.tvDetails.tvShowId
  );

  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div className="flex flex-col justify-between min-h-[100vh]">
      <Header />
      {movieIdFromStore ? (
        <MovieDetails />
      ) : actorIdFromStore ? (
        <ActorDetails />
      ) : tvShowIdFromStore ? (
        <TVDetails />
      ) : showGPTSearch ? (
        <GPTSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}  
      <Footer/>
      
    </div>
  );
};

export default Browse;
