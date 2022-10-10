import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieTypeApi } from "../../service/movieTypeApi";

export const createMovieType = createAsyncThunk(
  "movieType/add",
  async (item, { rejectWithValue }) => {
    try {
      const { data } = await MovieTypeApi.create(item);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
type movieTypeState = {
  movieType: any[];
  isFetching: boolean;
  isSucess: boolean;
  isErr: boolean;
};
const initialState: movieTypeState = {
  movieType: [],
  isFetching: false,
  isSucess: false,
  isErr: false,
};
const movieTypeSlice = createSlice({
  name: "movieType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createMovieType.pending, (state, action) => {
      state.isErr = false;
      state.isFetching = true;
      state.isSucess = false;
    });
    builder.addCase(createMovieType.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.movieType = action.payload;
    });
    builder.addCase(createMovieType.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });
  },
});

export default movieTypeSlice.reducer;
