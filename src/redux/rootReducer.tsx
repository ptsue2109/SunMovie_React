import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authReducer from "./slice/AuthSlice";
import userReducer from "./slice/userSlice";
import providerReducer from "./slice/Provider";
import tiketReducer from "./slice/tiketSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer"],
};
const reducers = combineReducers({
  authReducer,
  userReducer,
  providerReducer,
  tiketReducer,
});
const rootReducer = persistReducer(persistConfig, reducers);

export default rootReducer;
