import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import { MAIN_BG_IMG } from "../utils/constants";

const GPTSearch = () => {
  return (
    <div className="">
      <div className="absolute -z-20">
        <img
          className="brightness-50 fixed"
          src={MAIN_BG_IMG}
          alt="Background-Image"
        />
      </div>
      <GPTSearchBar />
      <GPTMovieSuggestions />
    </div>
  );
};

export default GPTSearch;
