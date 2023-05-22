import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "token",
  initialState: {
    token: null,
    user: null
  },
  reducers: {
    setData: (state, action) => {
      state.token = action.payload.token
      state.user = {...action.payload.user}
    }
  },
});

// Action creators are generated for each case reducer function
export const { setData} =
  userSlice.actions;

export default userSlice.reducer;
