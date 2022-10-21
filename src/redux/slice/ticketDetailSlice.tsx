import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TicketApi } from "../../service/ticket";

export const createTicketDetail = createAsyncThunk(
  "ticketDetail/add",
  async (item, { rejectWithValue }) => {
    try {
      const { data } = await TicketApi.createTiketDetail(item);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateTiketDetail = createAsyncThunk(
  "ticketDetail/update",
  async (items: any, { rejectWithValue }) => {
    try {
      const { data } = await TicketApi.updateTiketDetail(items);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTicketDetail = createAsyncThunk(
  "ticketDetail/list",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await TicketApi.getAllTicketDetail();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeTicketDetail = createAsyncThunk(
  "ticketDetailType/remove",
  async (id: any, { rejectWithValue }) => {
    try {
      const { data } = await TicketApi.removeTiketDetail(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
type ticketDetailState = {
  ticketDetail: any[];
  isFetching: boolean;
  isSucess: boolean;
  isErr: boolean;
};
const initialState: ticketDetailState = {
  ticketDetail: [],
  isFetching: false,
  isSucess: false,
  isErr: false,
};
const ticketDetailSlice = createSlice({
  name: "ticketDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create
    builder.addCase(createTicketDetail.pending, (state, action) => {
      state.isErr = false;
      state.isFetching = true;
      state.isSucess = false;
    });
    builder.addCase(createTicketDetail.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.ticketDetail.push(action.payload);
    });
    builder.addCase(createTicketDetail.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });
    // list
    builder.addCase(getTicketDetail.pending, (state, action) => {
      state.isErr = false;
      state.isFetching = true;
      state.isSucess = false;
    });
    builder.addCase(getTicketDetail.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.ticketDetail = action.payload;
    });
    builder.addCase(getTicketDetail.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });
    // remove
    builder.addCase(removeTicketDetail.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.ticketDetail = state.ticketDetail.filter(
        (item: any) => item._id !== action.payload._id
      );
      console.log(action.payload._id);
    });
    builder.addCase(removeTicketDetail.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });
    builder.addCase(removeTicketDetail.pending, (state, action) => {
      state.isFetching = true;
      state.isSucess = false;
      state.isErr = false;
    });
    ///update
    builder.addCase(updateTiketDetail.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });

    builder.addCase(updateTiketDetail.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.ticketDetail = state.ticketDetail.map((item: any) => {
        if (item._id !== action.payload._id) {
          return item;
        }
        return action.payload;
      });
    });
  },
});

export default ticketDetailSlice.reducer;
