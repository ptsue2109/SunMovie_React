import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";
import { UserApi } from "../../service/userApi";

export const getUsers = createAsyncThunk("users/getUsers", async (options: AxiosRequestConfig = {}) => {
   try {
      const { data } = await UserApi.getAll(options);
      return data;
   } catch (error: any) {
      return `${error.response.data}`
   }
});

export const removeUser = createAsyncThunk<any, string | undefined, { rejectValue: string }>("users/removeUser",
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await UserApi.removeUser(id);
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
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
      //getAll
      builder.addCase(getUsers.pending, (state, { payload }) => {
         state.isFetching = true
      });
      builder.addCase(getUsers.fulfilled, (state, { payload }) => {
         state.users = payload
         state.isFetching = false
      });

      //delete
      builder.addCase(removeUser.pending, (state) => {
         state.isFetching = true
         state.isErr= false
         state.isSucess = false
      });
      builder.addCase(removeUser.fulfilled, (state, { payload }) => {
         state.isFetching = false
         state.isErr = false
         state.isSucess = true
         state.users = state.users.filter((item) => item._id !== payload._id)
      });
      builder.addCase(removeUser.rejected, (state, { payload }) => {
         state.isErr = true
         state.isFetching = false
         state.isSucess = false
         state.errorMessage = payload
      });

   },
});
export default userSlice.reducer;