import { MAIN_BG_IMG } from "../../utils/constants";

const MovieShimmer = () => {
  return (
    <div>
      <div className="absolute md:relative -z-20">
        <img
          className="brightness-50 fixed h-screen object-cover md:h-auto top-0"
          src={MAIN_BG_IMG}
          alt="Background-Image"
        />
      </div>
      <div className="mt-[20%] sm:mt-[40%] mx-auto md:mt-[8%] h-fit md:h-[96%] w-[98%] relative bg-black backdrop-blur-lg bg-opacity-25 rounded-xl">
        <div className="w-full bg-gray-500 absolute -z-40">
          
        </div>
      </div>
    </div>
  );
};

export default MovieShimmer;
