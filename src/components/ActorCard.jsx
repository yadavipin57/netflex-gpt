import { useDispatch } from "react-redux";
import {
  populateActorId,
  toggleActorDetailsView,
} from "../utils/actorDetailsSlice";
import { IMG_CDN_URL } from "../utils/constants";
import {
  clearMovieId,
} from "../utils/movieDetailsSlice";

const ActorCard = ({ castInfo }) => {
  const dispatch = useDispatch();

  const handleActorClicked = (actorId) => {
    // actorId is recieved as argument here as it is passed as parameter where its referenced
    dispatch(clearMovieId());
    dispatch(toggleActorDetailsView());
    dispatch(populateActorId(actorId));
  };

  return (
    <div className="p-4 flex gap-10 overflow-x-scroll">
      {castInfo?.map((actor) => {
        if (actor?.profile_path === null) {
          return (
            <div className="w-[164px] flex-shrink-0" key={actor.id}>
              <img
                className="rounded-xl w-[164px] h-[246px] cursor-pointer"
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
            <div className="w-[164px] flex-shrink-0" key={actor.id}>
              <img
                className="rounded-xl w-[164px] h-[246px] cursor-pointer"
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
