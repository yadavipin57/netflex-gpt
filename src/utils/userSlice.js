import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addUser: (state, action)=>{
            return action.payload; // this will make the initialState as whatever is there in action.payload
        },
        removeUser: (state, action)=>{
            return null; // This will make initialState as null
        }
    }
})

export const {addUser, removeUser} = userSlice.actions;

export default userSlice.reducer;