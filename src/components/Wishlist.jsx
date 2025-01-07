import { useState } from "react";
import { MAIN_BG_IMG } from "../utils/constants";
import Footer from "./Footer";
import Header from "./Header";
import MovieCard from "./MovieCard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Wishlist = () => {
  const [isWishlistAccordionDown, setIsWishlistAccordionDown] = useState(false);
  const [isWatchlistAccordionDown, setIsWatchlistAccordionDown] =
    useState(false);

  const toggleWishlistAccordion = () => {
    setIsWishlistAccordionDown((prev) => !prev);
  };
  const toggleWatchlistAccordion = () => {
    setIsWatchlistAccordionDown((prev) => !prev);
  };

  return (
    <div className="flex flex-col justify-between min-h-[100vh]">
      <Header />
      <div className="absolute md:relative -z-20">
        <img
          className="brightness-50 fixed h-screen object-cover md:h-auto top-0"
          src={MAIN_BG_IMG}
          alt="Background-Image"
        />
      </div>
      <div className="mt-[20%] sm:mt-[40%] mx-auto md:mt-[8%] h-fit md:h-[96%] w-[98%] text-white relative bg-black backdrop-blur-lg bg-opacity-25 rounded-xl">
        {/* WIHSLIST */}
        <div>
          <div className=" flex items-center justify-between pt-4 px-8">
            <h2 className="text-3xl font-bold">Wishlist</h2>
            <span
              className="hover:bg-gray-700 transition-all rounded-full cursor-pointer"
              onClick={toggleWishlistAccordion}
            >
              {isWishlistAccordionDown ? (
                <KeyboardArrowUpIcon fontSize="large" />
              ) : (
                <KeyboardArrowDownIcon fontSize="large" />
              )}
            </span>
          </div>
          <div
            className={`p-8 pt-2 items-center justify-center flex-wrap ${
              isWishlistAccordionDown ? "flex" : "hidden"
            }`}
          >
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
              isWishlist={true}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
          </div>
        </div>
        {/* WATCHLIST */}
        <div>
          <div className="mb-8 flex items-center justify-between pt-4 px-8">
            <h2 className="text-3xl font-bold">Watched movies & shows</h2>
            <span
              className="hover:bg-gray-700 transition-all rounded-full cursor-pointer"
              onClick={toggleWatchlistAccordion}
            >
              {isWatchlistAccordionDown ? (
                <KeyboardArrowUpIcon fontSize="large" />
              ) : (
                <KeyboardArrowDownIcon fontSize="large" />
              )}
            </span>
          </div>
          <div
            className={`p-8 pt-0 items-center justify-center flex-wrap ${
              isWatchlistAccordionDown ? "flex" : "hidden"
            }`}
          >
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
              isWishlist={true}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
            <MovieCard
              movieId={299534}
              posterPath={"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"}
              nameOfMovie={"Avengers: Endgame"}
              releaseDate={"2019-04-24"}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
