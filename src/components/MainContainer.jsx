import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { MAIN_BG_IMG } from "../utils/constants";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return; // This is EARLY RETURN because if movies is null then movies[0] will cause an error to occur that is why we are already checking for null.

  const mainMovie = movies[0];

  const { id, original_title, overview } = mainMovie;

  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
      <div className="relative -z-20">
        <img
          className="brightness-50 fixed top-0"
          src={MAIN_BG_IMG}
          alt="Background-Image"
        />
      </div>
    </div>
  );
};

export default MainContainer;
