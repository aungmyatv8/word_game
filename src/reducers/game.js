import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    players: [],
    room: "",
    time: 60,
    isFirstPlayerTurn: true
  },
  reducers: {
    setData: (state, action) => {
      state.players = action.payload.players
      state.room = action.payload.room
      state.time = 6
    },
    resetTime: (state, _) => {
        state.time = 60
    },
    changeTime: (state, action) => {
      state.time = action.payload
    },
    changeTurn: (state, _) => {
      state.isFirstPlayerTurn = !state.isFirstPlayerTurn
    }
  },
});

// Action creators are generated for each case reducer function
export const { setData, resetTime, changeTime} =
  gameSlice.actions;

export default gameSlice.reducer;
