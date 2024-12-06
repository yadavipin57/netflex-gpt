const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-[20%] px-24 aspect-video absolute text-white bg-gradient-to-br from-black">
      <h1 className="text-6xl w-1/2 font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/2">{overview}</p>
      <div className="w-1/2">
        <button className="mr-2 py-2 px-6 rounded-sm text-black font-bold bg-gray-200 text-lg hover:bg-opacity-75">▶ Play</button>
        <button className="mr-2 py-2 px-6 rounded-sm bg-gray-200 text-lg bg-opacity-50">ℹ More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
