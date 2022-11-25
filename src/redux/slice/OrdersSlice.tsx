import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderApi } from "../../service/orders";

export const createOrder = createAsyncThunk(
  "order/add",
  async (item: any, { rejectWithValue }) => {
    try {
      const { data } = await orderApi.create(item);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllOrders = createAsyncThunk(
  "order/lits",
  async (_: any, { rejectWithValue }) => {
    try {
      const { data } = await orderApi.getAll();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState: any = {
  orders: [],
};
const movieTypeSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.order.push(action.payload);
    });
    //list
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.order = action.payload;
    });
  },
});

export default movieTypeSlice.reducer;
