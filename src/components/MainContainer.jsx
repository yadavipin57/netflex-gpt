import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return; // This is EARLY RETURN because if movies is null then movies[0] will cause an error to occur that is why we are already checking for null.

  const mainMovie = movies[0];

  const { id, original_title, overview } = mainMovie;

  return (
    <div className="overflow-hidden">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
