import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  roomId: "",
  resiverId: "",
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
} = userSlice.actions;

export default userSlice.reducer;