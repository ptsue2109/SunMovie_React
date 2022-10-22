import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authReducer from "./slice/AuthSlice";
import userReducer from "./slice/userSlice";
import movieTypeReducer from "./slice/movieTypeSlice";
import ticketReducer from "./slice/ticketSlice";
import ticketPriceReducer from "./slice/ticketPriceSlice";
import seatTypeReducer from "./slice/SeatTypeSlice";
import categoriesReducer from "./slice/CategorySlice";
import movie from "./slice/Movie";
import roomReducer from "./slice/roomSlice"
import FormatReducer from "./slice/FilmFormatSlice"
import ShowTimeSlice from "./slice/ShowTimeSlice"
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer"], 
};
const reducers = combineReducers({
  authReducer,
  userReducer,
  movieTypeReducer,
  ticketReducer,
  ticketPriceReducer,
  seatTypeReducer,
  categoriesReducer,
  movie,
  roomReducer,
  FormatReducer,
  ShowTimeSlice

});
const rootReducer = persistReducer(persistConfig, reducers);

export default rootReducer;
