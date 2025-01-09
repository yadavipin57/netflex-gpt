import { useDispatch } from "react-redux";
import { populateActorId } from "../utils/actorDetailsSlice";
import { IMG_CDN_URL } from "../utils/constants";
import { clearMovieId } from "../utils/movieDetailsSlice";

const ActorCard = ({ castInfo }) => {
  const dispatch = useDispatch();

  const handleActorClicked = (actorId) => {
    // actorId is recieved as argument here as it is passed as parameter where its referenced
    dispatch(clearMovieId());
    dispatch(populateActorId(actorId));
  };

  return (
    <div className="p-4 flex gap-4 sm:gap-8 overflow-x-scroll">
      {castInfo?.map((actor) => {
        if (actor?.profile_path === null) {
          return (
            <div className="w-[120px] flex-shrink-0" key={actor.id}>
              <img
                className="rounded-xl w-[120px] h-[180px] cursor-pointer"
                src="/noPerson.png"
                alt=""
                onClick={() => handleActorClicked(actor.id)}
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
            <div className="w-[120px] flex-shrink-0" key={actor.id}>
              <img
                className="rounded-xl w-[120px] h-[180px] cursor-pointer"
                src={IMG_CDN_URL + actor?.profile_path}
                alt=""
                onClick={() => handleActorClicked(actor.id)}
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
  );
};

export default ActorCard;
