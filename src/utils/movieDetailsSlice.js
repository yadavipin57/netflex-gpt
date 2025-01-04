import { createSlice } from "@reduxjs/toolkit";

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState: {
    showMovieDetails: false,
    movieDetails: null,
    movieId: null,
  },
  reducers: {
    toggleMovieDetailsView: (state) => {
      state.showMovieDetails = !state.showMovieDetails;
    },
    movieDetailsViewFalse: (state) => {
      state.showMovieDetails = false;
    },
    populateMovieId: (state, action) => {
      state.movieId = action.payload;
    },
    clearMovieId: (state)=>{
      state.movieId = null;
    }
  },
});

export const {
  toggleMovieDetailsView,
  movieDetailsViewFalse,
  populateMovieId,
  clearMovieId,
} = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;

// Basic structure of Slice
//1. use createSlice() to create a slice
//2. give it a name, initialState and reducers
//3. export the reducers functions one by one
//4. export the slice
//5. Import the slice in the store and define it inside the store
