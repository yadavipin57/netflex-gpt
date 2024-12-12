import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({posterPath, nameOfMovie, releaseDate }) => {

  if(!posterPath) return null;

  // console.log(nameOfMovie)

  const releaseYear = releaseDate.split("-")

  return (
    <div className="py-2 relative cursor-pointer group md:w-[200px] md:h-[300px] overflow-hidden">
      {/* Image */}
      <img
        className="w-full h-full object-cover border border-red-500 aspect-auto  transform transition-transform duration-300 group-hover:scale-110 group-hover:brightness-[0.4]"
        src={IMG_CDN_URL + posterPath}
        alt={nameOfMovie}
      />

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-start mx-1 md:px-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="font-bold text-lg md:text-3xl">{nameOfMovie}</h3>
        <p className="text-sm font-bold">{releaseYear[0]}</p>
      </div>
    </div>
  )
}

export default MovieCard