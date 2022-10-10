import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TiketApi } from "../../service/tiket";

export const getTiket = createAsyncThunk<any, void, { rejectValue: string }>(
  "tickets/getTicket",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await TiketApi.getAll();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const removeTiket = createAsyncThunk<
  any,
  string | undefined,
  { rejectValue: string }
>("tickets/removeTicket", async (id, { rejectWithValue }) => {
  try {
    const { data } = await TiketApi.removeTiket(id);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export const updateTiket = createAsyncThunk<any, any, { rejectValue: string }>(
  "tickets/updateTicket",
  async (tiket, { rejectWithValue }) => {
    try {
      const { data } = await TiketApi.updateTiket(tiket);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTiket = createAsyncThunk<any, any, { rejectValue: string }>(
  "tickets/createTicket",
  async (tiket, { rejectWithValue }) => {
    try {
      const { data } = await TiketApi.createTiket(tiket);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
type TiketState = {
  tickets: any[];
  isFetching: boolean;
  isSucess: boolean;
  isErr: boolean;
  errorMessage: string | undefined;
};
const initialState: TiketState = {
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
    builder.addCase(getTiket.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getTiket.fulfilled, (state, { payload }) => {
      state.tickets = payload;
      state.isFetching = false;
    });

    // delete
    builder.addCase(removeTiket.pending, (state) => {
      state.isFetching = true;
      state.isErr = false;
      state.isSucess = false;
    });
    builder.addCase(removeTiket.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isErr = false;
      state.isSucess = true;
      state.tickets = state.tickets.filter((item) => item._id !== payload._id);
    });
    builder.addCase(removeTiket.rejected, (state, { payload }) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
      state.errorMessage = payload;
    });

    //create
    builder.addCase(createTiket.pending, (state) => {
      state.isFetching = true;
      state.isSucess = false;
      state.isErr = false;
    });
    builder.addCase(createTiket.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSucess = true;
      state.isErr = false;
      state.tickets.push(payload);
    });
    builder.addCase(createTiket.rejected, (state, { payload }) => {
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
