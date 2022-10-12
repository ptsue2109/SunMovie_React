import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SeatTypeApi } from "../../service/seatTypeApi";

export const createSeatType = createAsyncThunk(
  "SeatType/add",
  async (item, { rejectWithValue }) => {
    try {
      const { data } = await SeatTypeApi.createSeatType(item);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateSeatType = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("SeatType/update", async (seatType, { rejectWithValue }) => {
  try {
    const { data } = await SeatTypeApi.updateSeatType(seatType);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getSeatType = createAsyncThunk(
  "SeatType/list",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await SeatTypeApi.getAll();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeSeatType = createAsyncThunk(
  "ticketPriceType/remove",
  async (id: any, { rejectWithValue }) => {
    try {
      const { data } = await SeatTypeApi.removeSeatType(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
type seatTypeState = {
  seatType: any[];
  isFetching: boolean;
  isSucess: boolean;
  isErr: boolean;
};
const initialState: seatTypeState = {
  seatType: [],
  isFetching: false,
  isSucess: false,
  isErr: false,
};
const SeatTypeSlice = createSlice({
  name: "seatType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create
    builder.addCase(createSeatType.pending, (state, action) => {
      state.isErr = false;
      state.isFetching = true;
      state.isSucess = false;
    });
    builder.addCase(createSeatType.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.seatType.push(action.payload);
    });
    builder.addCase(createSeatType.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });
    // list
    builder.addCase(getSeatType.pending, (state, action) => {
      state.isErr = false;
      state.isFetching = true;
      state.isSucess = false;
    });
    builder.addCase(getSeatType.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.seatType = action.payload;
    });
    builder.addCase(getSeatType.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });
    // remove
    builder.addCase(removeSeatType.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.seatType = state.seatType.filter(
        (x: any) => x._id !== action.payload._id
      );
    });
    builder.addCase(removeSeatType.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });
    ///update
    builder.addCase(updateSeatType.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.seatType = state.seatType.map((item: any) => {
        item._id !== action.payload._id ? item : action.payload;
      });
    });
  },
});

export default SeatTypeSlice.reducer;
