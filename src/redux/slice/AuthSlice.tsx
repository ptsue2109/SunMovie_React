import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "../../service/authApi";

// thunk :
export const authAsyncRegister = createAsyncThunk<
  { message: string; user: any | null },
  any,
  { rejectValue: string }
>("auth/authAsyncRegister", async (registerData, { rejectWithValue }) => {
  try {
    const { data } = await AuthApi.register(registerData);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const authAsyncLogin = createAsyncThunk<
  {
    [x: string]: string | undefined;
    message: string | undefined;
    accessToken: string;
    user: any | null;
  },
  any,
  { rejectValue: string }
>("auth/authAsyncLogin", async (loginData, { rejectWithValue }) => {
  try {
    const { data } = await AuthApi.login(loginData);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

//slice
const initialState: any = {
  currentUser: null,
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // reducers: viết code logic

    clearState: (state: {
      currentUser: null;
      isAuthenticated: boolean;
      accessToken: string;
    }) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.accessToken = "";
    },
    refreshToken: (state: { accessToken: any }, action: { payload: any }) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers(builder) {
    //viết các Case (3 case : pending(đang chờ dl), fullfill(data load/up thành công), reject(lỗi));
    builder.addCase(authAsyncLogin.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload.user;
      state.accessToken = action.payload.accessToken;
    });
  },
});
export const { clearState, refreshToken } = authSlice.actions;
export default authSlice.reducer;
