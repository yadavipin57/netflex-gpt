import lang from "../utils/languageConstans";
import { useRef } from "react";
import useMovieSearch from "../hooks/useMovieSearch";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";

const GPTSearchBar = () => {

  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const { triggerSearch } = useMovieSearch(searchText);

  return (
    <div className="pt-[30%] md:pt-[10%] flex justify-center">
      <form
        className="mt-10 md:mt-0 bg-black bg-opacity-50 rounded-lg w-full md:w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={searchText}
          className="my-3 mx-2 md:m-4 p-2 md:p-4 col-span-10 text-l md:text-lg rounded-lg outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent"
          placeholder={lang[langKey].gptSearchPlceholder}
        />
        <button
          className="my-2 mx-0 md:m-4 col-span-2 bg-[#D9232E] cursor-pointer text-white pointer rounded-lg"
          onClick={triggerSearch}
        >
          <SearchIcon/>
          {/* {lang[langKey].search} */}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
