import { combineReducers, configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./reducers/toggleSlice";
import videoSlice from "./reducers/videoSlice";
import userSlice from "./reducers/userSlice";
import chatSlice from "./reducers/chatSlice";
import channelSlice from "./reducers/channelSlice";

const rootReducer = combineReducers({
  toggleSlice,
  videoSlice,
  userSlice,
  chatSlice,
  channelSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
