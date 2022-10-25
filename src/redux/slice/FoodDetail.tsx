import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { foodDetailApi } from "../../service/foodDetail";

export const getFoodDetail = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("food/getFoodDetail", async (_, { rejectWithValue }) => {
  try {
    const { data } = await foodDetailApi.getAll();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export const removeFoodDetail = createAsyncThunk(
  "food/removeFoodDetail",
  async (id: any, { rejectWithValue }) => {
    try {
      const { data } = await foodDetailApi.removeApi(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateFoodDetail = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("food/updateFoodDetail", async (food, { rejectWithValue }) => {
  try {
    const { data } = await foodDetailApi.updateApi(food);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const createFoodDetail = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("food/createFoodDetail", async (food, { rejectWithValue }) => {
  try {
    const { data } = await foodDetailApi.create(food);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
type FoodDetailState = {
  foodDetail: any[];
  isFetching: boolean;
  isSucess: boolean;
  isErr: boolean;
  errorMessage: string | undefined;
};
const initialState: FoodDetailState = {
  foodDetail: [],
  isFetching: false,
  isSucess: false,
  isErr: false,
  errorMessage: "",
};

const foodDetailSlice = createSlice({
  name: "foodDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getAll
    builder.addCase(getFoodDetail.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getFoodDetail.fulfilled, (state, { payload }) => {
      state.foodDetail = payload;
      state.isFetching = false;
    });

    // delete
    builder.addCase(removeFoodDetail.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.foodDetail = state.foodDetail.filter(
        (item: any) => item._id !== action.payload._id
      );
    });
    builder.addCase(removeFoodDetail.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });

    //create
    builder.addCase(createFoodDetail.pending, (state) => {
      state.isFetching = true;
      state.isSucess = false;
      state.isErr = false;
    });
    builder.addCase(createFoodDetail.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSucess = true;
      state.isErr = false;
      state.foodDetail.push(payload);
    });
    builder.addCase(createFoodDetail.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isSucess = false;
      state.isErr = true;
      state.errorMessage = payload;
    });

    //update
    builder.addCase(updateFoodDetail.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;

      state.foodDetail = state.foodDetail.map((item: any) => {
        if (item._id !== action.payload._id) {
          return item;
        }
        return action.payload;
      });
    });
    builder.addCase(updateFoodDetail.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(updateFoodDetail.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });
  },
});
export default foodDetailSlice.reducer;
