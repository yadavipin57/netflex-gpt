import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showGPTSearch: false,
        movieResults: null,
        movieNames: null,
    },
    reducers: {
        toggleGPTSearchView: (state, action)=>{
            state.showGPTSearch = !state.showGPTSearch;
        },
        addAPIMovieResult: (state, action) =>{
            const {movieResults, movieNames} = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        },
    },
})

export const {toggleGPTSearchView, addAPIMovieResult} = gptSlice.actions;

export default gptSlice.reducer;