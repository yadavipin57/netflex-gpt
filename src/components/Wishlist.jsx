import { useEffect, useState } from "react";
import { MAIN_BG_IMG } from "../utils/constants";
import Footer from "./Footer";
import Header from "./Header";
import MovieCard from "./MovieCard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { get, ref } from "firebase/database";
import { auth, db } from "../utils/firebase";
import { useSelector } from "react-redux";

const Wishlist = () => {
  const randomNumber = useSelector((store) => store?.user?.randomNumber);

  const [isWishlistAccordionDown, setIsWishlistAccordionDown] = useState(true);
  const [isWatchlistAccordionDown, setIsWatchlistAccordionDown] =
    useState(true);

  const [moviesWishlistData, setMoviesWishlistData] = useState([]);
  const [moviesWatchedlistData, setMoviesWatchedlistData] = useState([]);

  const toggleWishlistAccordion = () => {
    setIsWishlistAccordionDown((prev) => !prev);
  };
  const toggleWatchlistAccordion = () => {
    setIsWatchlistAccordionDown((prev) => !prev);
  };

  const userId = auth?.currentUser?.uid;

  const wishlistRef = ref(db, `users/${userId}/wishlist`);
  const watchedlistRef = ref(db, `users/${userId}/watchedlist`);

  // Reusable function to fetch data
  const fetchMovies = async (reference, setState, logMessage) => {
    try {
      const snapshot = await get(reference);
      if (snapshot.exists()) {
        const movies = snapshot.val();
        const movieArray = Object.values(movies);
        setState(movieArray);
      } else {
        console.log(logMessage);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchMovies(
        wishlistRef,
        setMoviesWishlistData,
        "No data available in wishlist"
      );
      await fetchMovies(
        watchedlistRef,
        setMoviesWatchedlistData,
        "No data available in watched list"
      );
    };

    fetchData();
  }, [randomNumber]);

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
        <div className="">
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
            {moviesWishlistData?.map((movie) => {
              return (
                <MovieCard
                  movieId={movie?.movieId}
                  posterPath={movie?.posterPath}
                  nameOfMovie={movie?.nameOfMovie}
                  releaseDate={movie?.releaseDate}
                  isWishlist={true}
                  key={movie?.movieId}
                />
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto mt-4 w-[96%] h-[1px] bg-white"></div>

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
            {moviesWatchedlistData?.map((movie) => {
              return (
                <MovieCard
                  movieId={movie?.movieId}
                  posterPath={movie?.posterPath}
                  nameOfMovie={movie?.nameOfMovie}
                  releaseDate={movie?.releaseDate}
                  isWatchlist={true}
                  key={movie?.movieId}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;

// useEffect(() => {
//   get(wishlistRef)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         const movies = snapshot.val();
//         const movieArray = Object.values(movies);
//         setMoviesWishlistData(movieArray);
//       } else {
//         console.log("No data avalable");
//       }
//     })
//     .catch((error) => {
//       console.log("Something went wrong");
//     });

//   get(watchedlistRef)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         const movies = snapshot.val();
//         const movieArray = Object.values(movies);
//         setMoviesWatchedlistData(movieArray);
//       } else {
//         console.log("No data avalable");
//       }
//     })
//     .catch((error) => {
//       console.log("Something went wrong");
//     });

// }, [randomNumber]);
