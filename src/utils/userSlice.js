import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    randomNumber: 0,
  },
  reducers: {
    addUser: (state, action) => {
      return action.payload; // this will make the initialState as whatever is there in action.payload
    },
    removeUser: (state, action) => {
      return null; // This will make initialState as null
    },
    getRandomNumber: (state, action) => {
      state.randomNumber = action.payload;
    },
  },
});

export const { addUser, removeUser, getRandomNumber } = userSlice.actions;

export default userSlice.reducer;
