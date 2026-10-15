import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  roomId: "",
  resiverId: "",
  accessToken:"",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },

    setResiverId: (state, action) => {
      state.resiverId = action.payload;
    },
    setAccessToken:(state,action)=>{
      state.accessToken = action.payload
    },

    clearChat: (state) => {
      state.roomId = "";
      state.resiverId = "";
    },

    resetUserState: () => initialState,
  },
});

export const {
  setUser,
  setRoomId,
  setResiverId,
  clearChat,
  resetUserState,
  setAccessToken
} = userSlice.actions;

export default userSlice.reducer;