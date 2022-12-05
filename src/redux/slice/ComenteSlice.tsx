import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Comenter } from "../../service/commenApi";

export const comenteCreate = createAsyncThunk(
  "comente/comenteCreate",
  async (item: any, { rejectWithValue }) => {
    try {
      const { data } = await Comenter.create(item);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getComente = createAsyncThunk(
  "comente/list",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Comenter.getAll();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeComente = createAsyncThunk(
  "comente/remove",
  async (id: any, { rejectWithValue }) => {
    try {
      const { data } = await Comenter.remove(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOneComente = createAsyncThunk(
  "comente/getOneComente",
  async (slug: any, { rejectWithValue }) => {
    try {
      const { data } = await Comenter.getOne(slug);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
// silice
type CommenState = {
  isLogged: boolean;
  currentComent: any | {};
  accessToken: string;
};

const initialState: any = {
  commenter: [],
  oneslider: [],
  errMess: false,
  sliderSearch: [],
};
const ComenterSlice = createSlice({
  name: "commenter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create
    builder.addCase(comenteCreate.pending, (state, action) => {
      state.errMess = false;
      //   state.isFetching = true;
      //   state.isSucess = false;
    });
    builder.addCase(comenteCreate.fulfilled, (state, action) => {
      //   state.errMess = false;
      //   state.isFetching = false;
      //   state.isSucess = true;
      state.commenter.push(action.payload);
    });
    builder.addCase(comenteCreate.rejected, (state, action) => {
      state.errMess = action.payload;
      //   state.isFetching = false;
      //   state.isSucess = false;
    });
    // list

    builder.addCase(getComente.pending, (state, action) => {
      state.errMess = action.payload;
      //   state.isFetching = true;
      //   state.isSucess = false;
    });
    builder.addCase(getComente.fulfilled, (state, action) => {
      state.commenter = action.payload;
    });
    builder.addCase(getComente.rejected, (state, action) => {
      state.errMess = true;
      //   state.isFetching = false;
      //   state.isSucess = false;
    });
    // remove
    builder.addCase(removeComente.fulfilled, (state, action) => {
      state.errMess = action.payload;
      //   state.isFetching = false;
      //   state.isSucess = true;
      state.commenter = state.commenter.filter(
        (x: any) => x._id !== action.payload._id
      );
    });

    builder.addCase(getOneComente.pending, (state, action) => {
      state.errMess = false;
      state.isFetching = true;
      state.isSucess = false;
    });
    builder.addCase(getOneComente.fulfilled, (state, action) => {
      state.errMess = false;
      state.isFetching = false;
      state.isSucess = true;
      state.commenter = action.payload;
    });
    builder.addCase(getOneComente.rejected, (state, action) => {
      state.errMess = true;
      //   state.isFetching = false;
      //   state.isSucess = false;
    });
  },
});

export default ComenterSlice.reducer;
