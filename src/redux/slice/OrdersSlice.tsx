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
export const createPaymeny = createAsyncThunk(
  "order/add",
  async (item: any, { rejectWithValue }) => {
    try {
      const { data } = await orderApi.createPayment(item);
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
const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.orders.push(action.payload);
    });
    //list
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });

    builder.addCase(createPaymeny.fulfilled, (state, action) => {
      state.orders.push(action.payload);
    });
  },
});

export default OrderSlice.reducer;
