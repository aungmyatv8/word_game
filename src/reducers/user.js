import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "token",
  initialState: {
    value: null
  },
  reducers: {
    setAccessToken: (state, action) => {
        
        // console.log("action.pay", action.payload)
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAccessToken} =
  userSlice.actions;

export default userSlice.reducer;
