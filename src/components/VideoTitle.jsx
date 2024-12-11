const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-[50%] md:pt-[15%] md:px-24 w-[100%] h-[100%] md:h-screen relative md:absolute z-100 text-white md:bg-gradient-to-br from-black">
      <h1 className="ml-2 mb-1 md:ml-0 md:mb-0 text-sm md:text-6xl md:w-1/2 font-bold">
        {title}
      </h1>
      <p className="hidden md:block py-6 text-lg w-1/2">{overview}</p>
      <div className="w-1/2">
        <button className="ml-2 mb-1 md:ml-0 md:mb-0 text-sm py-1 px-2 md:text-base md:mr-2 md:py-2 md:px-6 rounded-sm text-black font-bold bg-gray-200 hover:bg-opacity-75">
          ▶ Play
        </button>
        <button className="mr-2 py-2 px-6 rounded-sm hidden md:inline-block text-base bg-gray-200 bg-opacity-50 hover:bg-opacity-25">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
