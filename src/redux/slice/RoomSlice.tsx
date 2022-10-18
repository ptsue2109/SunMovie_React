import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RoomApi } from "../../service/roomApi";

export const getRoom = createAsyncThunk<any, void, { rejectValue: string }>("room/getRoom",
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await RoomApi.getAll();
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   });
export const removeRoom = createAsyncThunk<any, string | undefined, { rejectValue: string }>("room/removeRoom",
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await RoomApi.removeRoom(id);
         return data.room;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   });
export const updateRoom = createAsyncThunk<any, any, { rejectValue: string }>("room/updateRoomr",
   async (upload, { rejectWithValue }) => {
      try {
         const { data } = await RoomApi.updateRoom(upload);
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   });

export const createRoom = createAsyncThunk<any, any, { rejectValue: string }>("room/createRoom",
   async (upload, { rejectWithValue }) => {
      try {
         const { data } = await RoomApi.create(upload);
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   });
type Roomtate = {
   rooms: any[];
   isFetching: boolean;
   errorMessage: string | undefined;
};
const initialState: Roomtate = {
   rooms: [],
   isFetching: false,
   errorMessage: "",

};

const Roomlice = createSlice({
   name: "Room",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      //getAll
      builder.addCase(getRoom.pending, (state) => {
         state.isFetching = true
      });
      builder.addCase(getRoom.fulfilled, (state, { payload }) => {
         state.rooms = payload
         state.isFetching = false
      });
      builder.addCase(getRoom.rejected, (state, { payload }) => {
         state.isFetching = false;
         state.errorMessage = payload
      });

      // delete
      builder.addCase(removeRoom.pending, (state) => {
         state.isFetching = true

      });
      builder.addCase(removeRoom.fulfilled, (state, { payload }) => {
         state.isFetching = false
         state.rooms = state.rooms.filter((item) => item._id !== payload._id);

      });
      builder.addCase(removeRoom.rejected, (state, { payload }) => {

         state.isFetching = false
         state.errorMessage = payload
      });

      //create
      builder.addCase(createRoom.pending, (state) => {
         state.isFetching = true;

      });
      builder.addCase(createRoom.fulfilled, (state, { payload }) => {
         state.isFetching = false;

         state.rooms.push(payload);
      });
      builder.addCase(createRoom.rejected, (state, { payload }) => {
         state.isFetching = false;
         state.errorMessage = payload;
      });


      //update
      builder.addCase(updateRoom.pending, (state) => {
         state.isFetching = true;
      });
      builder.addCase(updateRoom.fulfilled, (state, action) => {
         state.isFetching = false;
         state.rooms = state.rooms.map((item) =>
            item._id !== action.payload._id ? item : action.payload
         );
      });
      builder.addCase(updateRoom.rejected, (state, action) => {
         state.isFetching = false;
         state.errorMessage = action.payload;
      });
   },
});
export default Roomlice.reducer;