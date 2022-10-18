import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authReducer from "./slice/AuthSlice";
import userReducer from "./slice/userSlice";
import movieTypeReducer from "./slice/movieTypeSlice";
import seatReducer from "./slice/SeatSlice"
import seatTypeReducer from "./slice/SeatType"
import roomReducer from "./slice/RoomSlice"
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer"],
};
const reducers = combineReducers({
  authReducer,
  userReducer,
  movieTypeReducer,
  seatReducer,
  seatTypeReducer,
  roomReducer
 
});
const rootReducer = persistReducer(persistConfig, reducers);

export default rootReducer;
