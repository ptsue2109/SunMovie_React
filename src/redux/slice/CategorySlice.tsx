import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoriesApi } from "../../service/categoriesApi";

export const getCategories = createAsyncThunk("categories/list", async () => {
  const { data } = await CategoriesApi.getAll();
  return data;
});
export const createCategories = createAsyncThunk(
  "categories/create",
  async (item: any) => {
    const { data } = await CategoriesApi.create(item);
    return data;
  }
);
type categoriesState = {
  categories: any[];
  isFetching: boolean;
  isSucess: boolean;
  isErr: boolean;
};
const initialState: categoriesState = {
  categories: [],
  isFetching: false,
  isSucess: false,
  isErr: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSucess = true;
      state.categories = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isFetching = false;
      state.isSucess = false;
      state.isErr = true;
    });
    // create
    builder.addCase(createCategories.rejected, (state, action) => {
      state.isFetching = true;
      state.isSucess = false;
      state.isErr = false;
    });
    builder.addCase(createCategories.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSucess = true;
      state.isErr = false;
      state.categories.push(action.payload);
    });
  },
});

export default categoriesSlice.reducer;
