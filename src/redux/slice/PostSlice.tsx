import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PostApi } from "../../service/postApi";

export const getAlPost = createAsyncThunk<any, void, { rejectValue: string }>(
   "post/getAlPost",
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await PostApi.getAll();
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);
export const removeData = createAsyncThunk<any, any, { rejectValue: string }
>("post/removeData", async (id, { rejectWithValue }) => {
   try {
      const { data } = await PostApi.removeApi(id);
      return data.room;
   } catch (error: any) {
      return rejectWithValue(error.response.data);
   }
});
export const updateData = createAsyncThunk<any, any, { rejectValue: string }>(
   "post/updateData",
   async (input, { rejectWithValue }) => {
      try {
         const { data } = await PostApi.updateApi(input);
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);

export const createData = createAsyncThunk<any, any, { rejectValue: string }>(
   "post/create",
   async (input, { rejectWithValue }) => {
      try {
         const { data } = await PostApi.create(input);
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data.message);
      }
   }
);
type PostState = {
   posts: any[];
   errorMessage: string | undefined;
};
const initialState: PostState = {
   posts: [],
   errorMessage: "",
};

const PostSlice = createSlice({
   name: "post",
   initialState,
   reducers: {
   },
   extraReducers: (builder) => {
      //getAll

      builder.addCase(getAlPost.fulfilled, (state, { payload }) => {
         state.posts = payload;
      });
      builder.addCase(getAlPost.rejected, (state, { payload }) => {
         state.errorMessage = payload;
      });

      // delete

      builder.addCase(removeData.fulfilled, (state, action) => {

         state.posts = state.posts.filter((item) => item._id !== action.meta.arg);
      });
      builder.addCase(removeData.rejected, (state, { payload }) => {
         state.errorMessage = payload;
      });

      //create

      builder.addCase(createData.fulfilled, (state, { payload }) => {
         state.posts.push(payload);
      });
      builder.addCase(createData.rejected, (state, { payload }) => {
         state.errorMessage = payload;
      });

      //update

      builder.addCase(updateData.fulfilled, (state, action) => {

         state.posts = state.posts.map((item) =>
            item._id !== action.payload._id ? item : action.payload
         );
      });
      builder.addCase(updateData.rejected, (state, action) => {
         state.errorMessage = action.payload;
      });
   },
});

export default PostSlice.reducer;
