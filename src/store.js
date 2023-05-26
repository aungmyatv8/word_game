import { configureStore } from "@reduxjs/toolkit";

// import passwordReducer from "./reducers/password";
import userReducer from "./reducers/user";
import gameReducer from "./reducers/game";
// import courseReducer from "./reducers/course";
// import videoUploadReducer from "./reducers/video_upload";

export default configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
