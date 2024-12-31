import { useState, useEffect } from "react";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constants";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";

const MovieDetails = () => {
  const [movieInfo, setMovieInfo] = useState(null);
  const [castInfo, setCastInfo] = useState(null);
  const [crewInfo, setCrewInfo] = useState(null);
  const [posterPath, setPosterPath] = useState("");
  const [movieName, setMovieName] = useState("");
  const [overview, setOverview] = useState("");
  const [productions, setProductions] = useState([]);

  // Fetch movie info only once when the component mounts
  useEffect(() => {
    const getMovieInfo = async () => {
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/558449?language=en-US",
          API_OPTIONS
        );
        const json = await data.json();
        setMovieInfo(json);
        setPosterPath(json?.belongs_to_collection?.poster_path);
        setMovieName(json?.original_title);
        setOverview(json?.overview);
        setProductions(json?.production_companies);
      } catch (error) {
        console.error("Failed to fetch movie info:", error);
      }
    };

    getMovieInfo();
  }, []); // Empty dependency array ensures this runs only once

  // Fetch the crew info
  useEffect(() => {
    const getCredits = async () => {
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/558449/credits?language=en-US",
          API_OPTIONS
        );
        const json = await data.json();
        setCastInfo(json?.cast);
        setCrewInfo(json?.crew);
      } catch (error) {
        console.error("Failed to fetch credit info:", error);
      }
    };

    getCredits();
  }, []);

  const directors = crewInfo?.filter((crew) => crew?.job === "Director");
  const writers = crewInfo?.filter((crew) => crew?.job === "Story");

  // console.log(crewInfo);

  return (
    <div className="z-50">
      <div className="mt-[40%] mx-auto md:mt-[8%] h-[76%] md:h-[96%] w-[96%] bg-black backdrop-blur-lg bg-opacity-25 rounded-xl">
        {/* TOP */}
        <div className="py-10 px-4 flex items-start justify-evenly h-fit ">
          <div className="flex-1 h-[426px]">
            <img
              className="mx-auto w-[284px] h-[426px] object-cover rounded-lg border border-red-700"
              src={IMG_CDN_URL + posterPath}
              alt={movieName || "Movie Poster"}
            />
          </div>
          <div className="flex flex-col justify-between flex-[2] h-[426px]">
            <div className="font-bold text-white flex items-baseline gap-4">
              <div className="sm:text-7xl">{movieName}</div>
              <div
                className="px-3 py-1 rounded-lg flex itetms-center gap-1 bg-[#eb3944]"
                title={`Votes: ${movieInfo?.vote_count}`}
              >
                <StarBorderPurple500Icon /> {movieInfo?.vote_average.toFixed(1)}
              </div>
            </div>
            <div className="py-2 text-xl text-white">{overview}</div>
            {/* Release date, runtime, lang */}
            <div className="text-white">
              <span title="YYYY-MM-DD">{movieInfo?.release_date} | </span>
              <span>{movieInfo?.runtime} mins | </span>
              <span>{movieInfo?.spoken_languages[0]?.name}</span>
            </div>
            {/* Genres */}
            <div className="text-white flex gap-4">
              {movieInfo?.genres?.map((genre) => {
                return (
                  <span
                    className="px-3 py-1 rounded-2xl border border-[#a3a3a3] hover:bg-[#454545] transition-all cursor-pointer"
                    key={genre.id}
                  >
                    {genre?.name}
                  </span>
                );
              })}
            </div>
            <div className="">
              <h3 className="mb-2 text-white text-xl">Production Companies</h3>
              <div className="flex items-center">
                {productions.map((production) => (
                  <p
                    className="mr-2 p-2 bg-[#eb3944] text-white flex items-center gap-1 rounded-md cursor-pointer hover:bg-[#ff5151] transition-all"
                    key={production?.id}
                  >
                    <img
                      className="h-5"
                      src={IMG_CDN_URL + production?.logo_path}
                      alt=""
                    />{" "}
                    {production.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* Cast */}
          <div className="">
            <h2 className="mt-2 px-4 text-3xl text-white font-bold">Cast</h2>
            <div className="p-4 flex gap-10 overflow-x-scroll">
              {castInfo?.map((actor) => {
                if (actor?.profile_path === null) {
                  return (
                    <div className="w-[164px] flex-shrink-0" key={actor.id}>
                      <img
                        className="rounded-xl w-[164px] h-[246px]"
                        src="/noPerson.png"
                        alt=""
                      />
                      <p className="text-xl text-white font-bold">
                        {actor?.name}
                        <span className="text-[16px] font-normal">
                          , as {actor?.character}
                        </span>
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <div className="w-[164px] flex-shrink-0" key={actor.id}>
                      <img
                        className="rounded-xl w-[164px] h-[246px]"
                        src={IMG_CDN_URL + actor?.profile_path}
                        alt=""
                      />
                      <p className="text-xl text-white font-bold">
                        {actor?.name}
                        <span className="text-[16px] font-normal">
                          , as {actor?.character}
                        </span>
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          {/* Directors */}
          <div>
            <h2 className="mt-2 px-4 text-3xl text-white font-bold">
              Director(s)
            </h2>
            <div className="p-4 flex gap-10 overflow-x-scroll">
              {directors?.map((director) => {
                if (director?.profile_path === null) {
                  return (
                    <div className="w-[164px] flex-shrink-0" key={director.id}>
                      <img
                        className="rounded-xl w-[164px] h-[246px]"
                        src="/noPerson.png"
                        alt=""
                      />
                      <p className="text-xl text-white font-bold">
                        {director?.name}
                        <span className="text-[16px] font-normal">
                          , as {director?.character}
                        </span>
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <div className="w-[164px] flex-shrink-0" key={director.id}>
                      <img
                        className="rounded-xl w-[164px] h-[246px]"
                        src={IMG_CDN_URL + director?.profile_path}
                        alt=""
                      />
                      <p className="text-xl text-white font-bold">
                        {director?.name}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          {/* Wrters */}
          <div>
            <h2 className="mt-2 px-4 text-3xl text-white font-bold">
              Writer(s)
            </h2>
            <div className="p-4 flex gap-10 overflow-x-scroll">
              {writers?.map((writer) => {
                if (writer?.profile_path === null) {
                  return (
                    <div className="w-[164px] flex-shrink-0" key={writer.id}>
                      <img
                        className="rounded-xl w-[164px] h-[246px]"
                        src="/noPerson.png"
                        alt=""
                      />
                      <p className="text-xl text-white font-bold">
                        {writer?.name}
                        <span className="text-[16px] font-normal">
                          , as {writer?.character}
                        </span>
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <div className="w-[164px] flex-shrink-0" key={writer.id}>
                      <img
                        className="rounded-xl w-[164px] h-[246px]"
                        src={IMG_CDN_URL + writer?.profile_path}
                        alt=""
                      />
                      <p className="text-xl text-white font-bold">
                        {writer?.name}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
