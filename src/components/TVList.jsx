import React from "react";
import TVCard from "./TVCard";

const TVList = ({ title, tvShows }) => {

  return (
    <div className="mx-1 md:px-6 md:py-3">
      <div>
        <h1 className="pb-1 md:pb-3 font-bold text-white text-lg md:text-xl">
          {title}
        </h1>
        <div className=" flex gap-1 md:gap-5 overflow-y-hidden overflow-x-auto">
          {tvShows &&
            tvShows.map((tvShow, index) => (
              <div
                className="flex-shrink-0 w-[45%] md:w-[200px]"
                key={tvShow.id+index} // Some items had same id, this is why index is added to make them unique
              >
                <TVCard
                  tvId={tvShow?.id}
                  posterPath={tvShow.poster_path}
                  nameOfTVShow={tvShow?.title}
                  firstAirDate={tvShow.first_air_date}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TVList;
