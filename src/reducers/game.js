import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    players: [],
    room: "",
    time: 60,
    lastWord: null,
    isFirstPlayerTurn: true
  },
  reducers: {
    setData: (state, action) => {
      state.players = action.payload.players
      state.room = action.payload.room
      state.time = action.payload.time ? action.payload.time : 60
    },
    resetTime: (state, time) => {
        state.time = 60
    },
    changeTime: (state, action) => {
      state.time = action.payload
    },
    changeTurn: (state, _) => {
      state.isFirstPlayerTurn = !state.isFirstPlayerTurn
    },
    changeLastWord: (state, action) => {
      state.lastWord = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setData, resetTime, changeTime, changeTurn, changeLastWord} =
  gameSlice.actions;

export default gameSlice.reducer;
