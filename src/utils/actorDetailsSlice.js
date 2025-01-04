import { createSlice } from "@reduxjs/toolkit";

const actorDetailsSlice = createSlice({
  name: "actorDetails",
  initialState: {
    showActorDetails: false,
    actorDetails: null,
    // actorMovieNames: null,
    actorTVNames: null,
    actorId: null,
  },
  reducers: {
    toggleActorDetailsView: (state) => {
      state.showActorDetails = !state.showActorDetails;
    },
    actorDetailsViewFalse: (state) => {
      state.showActorDetails = false;
    },
    populateActorId: (state, action) => {
      state.actorId = action.payload;
    },
    clearActorId: (state) => {
      state.actorId = null;
    },
  },
});

export const {
  toggleActorDetailsView,
  actorDetailsViewFalse,
  populateActorId,
  clearActorId,
} = actorDetailsSlice.actions;

export default actorDetailsSlice.reducer;
