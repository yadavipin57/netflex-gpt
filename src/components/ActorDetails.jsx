import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, IMG_CDN_URL, MAIN_BG_IMG } from "../utils/constants";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { clearActorId } from "../utils/actorDetailsSlice";
import MovieList from "./MovieList";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";

const ActorDetails = () => {
  const actorId = useSelector((store) => store?.actorDetails?.actorId);

  const [actorInfo, setActorInfo] = useState(null);
  const [actorExternalLinksInfo, setActorExternalLinkInfo] = useState(null);
  const [actorMovieNamesInfo, setActorMovieNamesInfo] = useState(null);
  const [actorTVNamesInfo, setActorTVNamesInfo] = useState(null);

  const [gender, setGender] = useState("NA");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        const [actorRes, actorExternalLinksRes, actorMovieRes, actorTVRes] =
          await Promise.all([
            fetch(
              `https://api.themoviedb.org/3/person/${actorId}?language=en-US`,
              API_OPTIONS
            ),
            fetch(
              `https://api.themoviedb.org/3/person/${actorId}/external_ids`,
              API_OPTIONS
            ),
            fetch(
              `https://api.themoviedb.org/3/person/${actorId}/movie_credits?language=en-US`,
              API_OPTIONS
            ),
            fetch(`https://api.themoviedb.org/3/person/${actorId}/tv_credits?language=en-US`, API_OPTIONS)
          ]);

        const actorData = await actorRes.json();
        const actorExternatLinksData = await actorExternalLinksRes.json();
        const actorMovieNamesData = await actorMovieRes.json();
        const actorTVNamesData = await actorTVRes.json();

        setActorInfo(actorData);
        setActorExternalLinkInfo(actorExternatLinksData);
        setActorMovieNamesInfo(actorMovieNamesData);
        setActorTVNamesInfo(actorTVNamesData);

        if (actorData?.gender === 1) {
          setGender("Female");
        } else if (actorData?.gender === 2) {
          setGender("Male");
        }
      } catch (error) {
        console.log("Failed to fetch actor data: ", error);
      }
    };

    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });

    if (actorId) fetchActorData();
  }, [actorId]);

  const handleMovieDetailsClose = () => {
    dispatch(clearActorId());
  };

  const birthDateArray = actorInfo?.birthday.split("-");
  const birthMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className=" sm:mt-0 z-50">
      <div className="absolute md:relative -z-20">
        <img
          className="brightness-50 fixed h-screen object-cover md:h-auto top-0"
          src={MAIN_BG_IMG}
          alt="Background-Image"
        />
      </div>
      <div className="mt-[20%] sm:mt-[40%] mx-auto md:mt-[8%] h-fit md:h-[96%] w-[98%] relative bg-black backdrop-blur-lg bg-opacity-25 rounded-xl">
        <div>
          <div
            className="p-2 h-fit text-white absolute right-2 top-2 cursor-pointer hover:bg-[#8f8f8fb8] transition-all rounded-full"
            title="Close"
            onClick={handleMovieDetailsClose}
          >
            <CloseIcon />
          </div>
          <div className="p-12 text-white sm:flex items-start justify-evenly h-fit">
            <div className="">
              <img
                className="mx-auto w-[144px] block sm:w-[360px] sm:h-[540px] object-cover rounded-xl cursor-pointer border border-red-700"
                src={IMG_CDN_URL + actorInfo?.profile_path}
                alt={actorInfo?.name || "Movie Poster"}
              />
            </div>
            <div className="w-1/2 sm:h-[540px] flex flex-col justify-between">
              <div className="text-5xl font-bold">
                {actorInfo?.name},{" "}
                <span className="text-lg font-normal">
                  {actorInfo?.known_for_department}
                </span>{" "}
              </div>
              <div className="flex items-center">
                <div className="text-xl">
                  Born:
                  {` ${birthMonth[birthDateArray?.[1] - 1]} ${
                    birthDateArray?.[2]
                  }, ${birthDateArray?.[0]},`}
                  &nbsp;
                </div>
                <div className="text-xl">
                  {actorInfo?.place_of_birth}&nbsp;|&nbsp;
                </div>
                <div className="text-xl"> {gender}</div>
              </div>
              <div>
                {actorInfo?.deathday ? `Death: ${actorInfo?.deathday}` : ""}
              </div>
              <div>
                {actorInfo?.homepage ? `Website: ` : null}
                <a
                  className="text-blue-500"
                  href={actorInfo?.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {actorInfo?.homepage ? `${actorInfo?.homepage}` : null}
                </a>
              </div>
              <div className="overflow-y-scroll text-justify">
                {actorInfo?.biography}
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-evenly">
              {actorExternalLinksInfo?.facebook_id && (
                <span className="px-4 py-2 flex items-center gap-1 rounded-lg text-white bg-[#D7232E]">
                  <FacebookIcon />@{actorExternalLinksInfo?.facebook_id}
                </span>
              )}
              {actorExternalLinksInfo?.instagram_id && (
                <span className="px-4 py-2 flex items-center gap-1 rounded-lg text-white bg-[#D7232E]">
                  <InstagramIcon />@{actorExternalLinksInfo?.instagram_id}
                </span>
              )}
              {actorExternalLinksInfo?.twitter_id && (
                <span className="px-4 py-2 flex items-center gap-1 rounded-lg text-white bg-[#D7232E]">
                  <XIcon />@{actorExternalLinksInfo?.twitter_id}
                </span>
              )}
              {actorExternalLinksInfo?.youtube_id && (
                <span className="px-4 py-2 flex items-center gap-1 rounded-lg text-white bg-[#D7232E]">
                  <YouTubeIcon />@{actorExternalLinksInfo?.youtube_id}
                </span>
              )}
            </div>
          </div>
          <div className="mt-10">
            {/* This send the list of movies of that actor to MovieList as prop */}
            <MovieList showType={"movie"} title={`Movies`} movies={actorMovieNamesInfo?.cast} />
            {/* <MovieList showType={"tv"} title={`TV Series`} movies={actorTVNamesInfo?.cast} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorDetails;
