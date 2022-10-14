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
import ticketDetailReducer from "./slice/ticketDetailSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer"], // bất cứ reducer nào để trong whitelist => được up  và update lên localStorage
};
const reducers = combineReducers({
  authReducer,
  userReducer,
  movieTypeReducer,
  ticketReducer,
  ticketPriceReducer,
  seatTypeReducer,
  categoriesReducer,
  ticketDetailReducer,
});
const rootReducer = persistReducer(persistConfig, reducers);

export default rootReducer;
