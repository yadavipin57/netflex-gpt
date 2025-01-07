import { useDispatch } from "react-redux";
import { LOGO } from "../utils/constants";
import { clearActorId } from "../utils/actorDetailsSlice";
import { clearMovieId } from "../utils/movieDetailsSlice";
import { clearTVId } from "../utils/tvDetailsSlice";
import { toggleGPTSearchView } from "../utils/gptSlice";

const Footer = () => {

  const dispatch = useDispatch();

  const handleGoToHomepage = () => {
      dispatch(clearActorId());
      dispatch(clearMovieId());
      dispatch(clearTVId());
      dispatch(toggleGPTSearchView())
    };

  return (
    <div className="mt-12 p-2  bg-gradient-to-r bg-[#361818] bg-opacity-70 backdrop-blur-lg">
      <div className="flex items-center justify-between">
        <div className="cursor-pointer" onClick={handleGoToHomepage} title="Go to homepage">
          <img className="w-28 md:w-44 mx-auto md:mx-" src={LOGO} alt="LOGO" />
        </div>
        <div className="w-1/2 sm:w-auto flex flex-col sm:flex-row items-center">
          <img className="w-24 sm:w-32" src="./TMDB_LOGO.svg" alt="TMDB_LOGO" />
          <p className="hidden sm:block p-4 text-white text-xl">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </div>
      </div>
      <p className="sm:hidden text-white text-justify">This product uses the TMDB API but is not endorsed or certified by
      TMDB.</p>
    </div>
  );
};

export default Footer;
