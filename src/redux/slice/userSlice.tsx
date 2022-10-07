import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";
import { UserApi } from "../../service/userApi";
import { RootState } from "../store";

export const getUsers = createAsyncThunk("users/getUsers", async (options: AxiosRequestConfig = {}) => {

   try {
      const { data } = await UserApi.getAll(options);
      return data;
   } catch (error: any) {
      return `${error.response.data}`
   }
});

type UserState = {
   users: any[];
   isFetching: boolean;
   isSucess: boolean;
   isErr: boolean;
   errorMessage: string | undefined;
};
const initialState: UserState = {
   users: [],
   isFetching: false,
   isSucess: false,
   isErr: false,
   errorMessage: "",

};

const userSlice = createSlice({
   name: "users",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getUsers.fulfilled, (state, { payload }) => {
         state.isFetching = false;
         state.isSucess = false;
         state.users = payload;
      });


   },
});
export default userSlice.reducer;