import { createSlice } from "@reduxjs/toolkit";

const actorDetailsSlice = createSlice({
  name: "actorDetails",
  initialState: {
    actorId: null,
  },
  reducers: {
    populateActorId: (state, action) => {
      state.actorId = action.payload;
    },
    clearActorId: (state) => {
      state.actorId = null;
    },
  },
});

export const {
  populateActorId,
  clearActorId,
} = actorDetailsSlice.actions;

export default actorDetailsSlice.reducer;
