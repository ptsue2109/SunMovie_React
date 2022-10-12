import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TicketApi } from "../../service/ticket";

export const getTicket = createAsyncThunk<any, void, { rejectValue: string }>(
  "tickets/getTicket",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await TicketApi.getAll();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const removeTicket = createAsyncThunk(
  "tickets/removeTicket",
  async (id: any, { rejectWithValue }) => {
    try {
      const { data } = await TicketApi.removeTiket(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateTiket = createAsyncThunk<any, any, { rejectValue: string }>(
  "tickets/updateTicket",
  async (tiket, { rejectWithValue }) => {
    try {
      const { data } = await TicketApi.updateTiket(tiket);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTicket = createAsyncThunk<any, any, { rejectValue: string }>(
  "tickets/createTicket",
  async (tiket, { rejectWithValue }) => {
    try {
      const { data } = await TicketApi.createTiket(tiket);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
type TicketState = {
  tickets: any[];
  isFetching: boolean;
  isSucess: boolean;
  isErr: boolean;
  errorMessage: string | undefined;
};
const initialState: TicketState = {
  tickets: [],
  isFetching: false,
  isSucess: false,
  isErr: false,
  errorMessage: "",
};

const tiketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getAll
    builder.addCase(getTicket.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getTicket.fulfilled, (state, { payload }) => {
      state.tickets = payload;
      state.isFetching = false;
    });

    // delete
    builder.addCase(removeTicket.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.tickets = state.tickets.filter(
        (x: any) => x._id !== action.payload._id
      );
    });
    builder.addCase(removeTicket.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });

    //create
    builder.addCase(createTicket.pending, (state) => {
      state.isFetching = true;
      state.isSucess = false;
      state.isErr = false;
    });
    builder.addCase(createTicket.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSucess = true;
      state.isErr = false;
      state.tickets.push(payload);
    });
    builder.addCase(createTicket.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isSucess = false;
      state.isErr = true;
      state.errorMessage = payload;
    });

    //update
    builder.addCase(updateTiket.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(updateTiket.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSucess = true;
      state.tickets = state.tickets.map((item) =>
        item._id !== action.payload._id ? item : action.payload
      );
    });
    builder.addCase(updateTiket.rejected, (state, action) => {
      state.isFetching = false;

      state.errorMessage = action.payload;
    });
  },
});
export default tiketSlice.reducer;
