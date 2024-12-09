import { useSelector } from "react-redux";
import lang from "../utils/languageConstans";

const GPTSearchBar = () => {

  const langKey = useSelector(store => store.config.lang);

  return (
    <div className="pt-[5%] flex justify-center">
      <form className="bg-black bg-opacity-50 rounded-lg w-1/2 grid grid-cols-12">
        <input
          type="text"
          className="p-4 m-4 col-span-10 rounded-lg outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent"
          placeholder={lang[langKey].gptSearchPlceholder}
        />
        <button className="m-4 py-4 px-4 bg-[#D9232E] cursor-pointer text-white pointer rounded-lg col-span-2">{lang[langKey].search}</button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
