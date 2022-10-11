import { AxiosRequestConfig } from "axios";
import AxiosRequest from "./instance";

export const MovieTypeApi = {
  getAll() {
    return AxiosRequest.get("/movieType");
  },
  remove(id?: any) {
    let url = `movieType/${id}`;
    return AxiosRequest.delete(url);
  },
  create(data?: any) {
    return AxiosRequest.post("/movieType", data);
  },
  edit(data: any) {
    return AxiosRequest.patch(`/movieType/${data._id}`, data);
  },
};
