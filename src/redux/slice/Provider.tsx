import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";
import AxiosRequest from "../../service/instance";


export const getProviderApi = () =>{
   let url = "https://provinces.open-api.vn/api/?depth=2";
   return AxiosRequest.get(url)
 }

export const getProvider = createAsyncThunk("cities/getALL", async (options: AxiosRequestConfig = {}) => {
   try {
      const { data } = await  getProviderApi()
      return data;
   } catch (error: any) {
      return `${error.response.data}`
   }
});

type ProviderState = {
   providers: any[];
   ward: any[],
   districts: any[]
};
const initialState: ProviderState = {
   providers: [],
   ward: [],
   districts: []

};


const providerSlice = createSlice({
   name: "providers",
   initialState,
   reducers: {

   },
   extraReducers: (builder) => {
      builder.addCase(getProvider.fulfilled, (state, { payload }) => {
         state.providers = payload
      });
      builder.addCase(getProvider.pending, (state, { payload }) => {
         state.providers = []
      });
      builder.addCase(getProvider.rejected, (state, { payload }) => {
         state.providers = []
      });
   },
});
export default providerSlice.reducer;