import { persistReducer } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import authReducer from "./slice/AuthSlice"
import userReducer from "./slice/userSlice"
const persistConfig = {
   key: "root", 
   storage,
   whitelist: ["authReducer"],
}
const reducers = combineReducers({
   authReducer,
   userReducer
})
const rootReducer = persistReducer(persistConfig, reducers);

export default rootReducer