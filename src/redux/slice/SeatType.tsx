import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SeatTypeApi } from "../../service/seatType";


export const getSeatsType = createAsyncThunk<any, void, { rejectValue: string }>("seats-type/getAll",
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await SeatTypeApi.getAll();
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   });


type SeatsState = {
   seatType: any[];
   errorMessage: string
};
const initialState: SeatsState = {
   seatType: [],
   errorMessage: ''
};
const seatSlice = createSlice({
   name: "seats",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getSeatsType.fulfilled, (state, { payload }) => {
         state.seatType = payload
        
      });
   },
});
export default seatSlice.reducer;