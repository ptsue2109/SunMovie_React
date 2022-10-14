import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TicketApi } from "../../service/ticket";

export const createTicketPrice = createAsyncThunk(
  "ticketPriceType/add",
  async (item, { rejectWithValue }) => {
    try {
      const { data } = await TicketApi.createTiketPrice(item);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateTiketPrice = createAsyncThunk(
  "ticketPrice/update",
  async (items: any, { rejectWithValue }) => {
    try {
      const { data } = await TicketApi.updateTiketPrice(items);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTicketPrice = createAsyncThunk(
  "ticketPriceType/list",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await TicketApi.getAllTicketPrice();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeTicketPrice = createAsyncThunk(
  "ticketPriceType/remove",
  async (id: any, { rejectWithValue }) => {
    try {
      const { data } = await TicketApi.removeTiketPrice(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
type ticketPriceState = {
  ticketPrice: any[];
  isFetching: boolean;
  isSucess: boolean;
  isErr: boolean;
};
const initialState: ticketPriceState = {
  ticketPrice: [],
  isFetching: false,
  isSucess: false,
  isErr: false,
};
const ticketPriceSlice = createSlice({
  name: "ticketPrice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create
    builder.addCase(createTicketPrice.pending, (state, action) => {
      state.isErr = false;
      state.isFetching = true;
      state.isSucess = false;
    });
    builder.addCase(createTicketPrice.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.ticketPrice.push(action.payload);
    });
    builder.addCase(createTicketPrice.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });
    // list
    builder.addCase(getTicketPrice.pending, (state, action) => {
      state.isErr = false;
      state.isFetching = true;
      state.isSucess = false;
    });
    builder.addCase(getTicketPrice.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.ticketPrice = action.payload;
    });
    builder.addCase(getTicketPrice.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });
    // remove
    builder.addCase(removeTicketPrice.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.ticketPrice = state.ticketPrice.filter(
        (item: any) => item._id !== action.payload.ticketPrice._id
      );
    });
    builder.addCase(removeTicketPrice.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });
    builder.addCase(removeTicketPrice.pending, (state, action) => {
      state.isFetching = true;
      state.isSucess = false;
      state.isErr = false;
    });
    ///update
    builder.addCase(updateTiketPrice.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });

    builder.addCase(updateTiketPrice.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.ticketPrice = state.ticketPrice.map((item: any) => {
        if (item._id !== action.payload._id) {
          return item;
        }
        return action.payload;
      });
    });
  },
});

export default ticketPriceSlice.reducer;