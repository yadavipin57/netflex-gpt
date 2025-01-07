import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { MAIN_BG_IMG } from "../utils/constants";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return; // This is EARLY RETURN because if movies is null then movies[0] will cause an error to occur that is why we are already checking for null.

  let randomIndex = Math.floor(Math.random()*20);

  const mainMovie = movies[randomIndex];

  const { id, title, overview } = mainMovie;

  return (
    <div className="relative">
      <VideoTitle title={title} overview={overview} movieId={id} />
      <VideoBackground movieId={id} />
      <div className="absolute md:relative -z-20">
        <img
          className="brightness-50 fixed h-screen object-cover md:h-auto top-0"
          src={MAIN_BG_IMG}
          alt="Background-Image"
        />
      </div>
    </div>
  );
};

export default MainContainer;
