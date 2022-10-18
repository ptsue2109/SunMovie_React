import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SeatApi } from "../../service/seatApi";


export const getSeats = createAsyncThunk<any, void, { rejectValue: string }>("seats/getAll",
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await SeatApi.getAll();
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   });


type SeatsState = {
   seats: any[];
   errorMessage: string
};
const initialState: SeatsState = {
   seats: [],
   errorMessage: ''
};
const seatSlice = createSlice({
   name: "seats",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getSeats.fulfilled, (state, { payload }) => {
         state.seats = payload
      })
   },
});
export default seatSlice.reducer;