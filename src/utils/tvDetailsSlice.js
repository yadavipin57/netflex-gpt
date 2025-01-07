import { createSlice } from "@reduxjs/toolkit";

const tvDetailsSlice = createSlice({
  name: "tvDetails",
  initialState: {
    tvShowId: null,
  },
  reducers: {
    populateTVId: (state, action) => {
      state.tvShowId = action.payload;
    },
    clearTVId: (state)=>{
      state.tvShowId = null;
    }
  },
});

export const {
  populateTVId,
  clearTVId,
} = tvDetailsSlice.actions;

export default tvDetailsSlice.reducer;

// Basic structure of Slice
//1. use createSlice() to create a slice
//2. give it a name, initialState and reducers
//3. export the reducers functions one by one
//4. export the slice
//5. Import the slice in the store and define it inside the store
