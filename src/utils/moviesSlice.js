import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        trailerVideo: null,
        popularMovies: null,
        trendingMovies: null,
        topRatedMovies: null,
        upcomingMovies: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action)=>{
            state.nowPlayingMovies = action.payload; // Put every movies into nowPlayingMovies
        },
        addPopularMovies: (state, action)=>{
            state.popularMovies = action.payload; // Put every movies into nowPlayingMovies
        },
        addTrendingMovies: (state, action)=>{
            state.trendingMovies = action.payload; // Put every movies into nowPlayingMovies
        },
        addTopRatedMovies: (state, action)=>{
            state.topRatedMovies = action.payload;
        },
        addUpcomingMovies: (state, action)=>{
            state.upcomingMovies = action.payload;
        },
        addTrailerVideo: (state, action)=>{
            state.trailerVideo = action.payload;
        }
    },
})

export const {addNowPlayingMovies, addPopularMovies, addTopRatedMovies, addTrendingMovies, addUpcomingMovies, addTrailerVideo} = moviesSlice.actions;

export default moviesSlice.reducer;

