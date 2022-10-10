import { AxiosRequestConfig } from "axios";
import AxiosRequest from "./instance";

export const MovieTypeApi = {
  getAll(options: AxiosRequestConfig = {}): Promise<any> {
    let url = "/movieType";
    return AxiosRequest.get(url, options);
  },
  remove(id?: any) {
    let url = `movieType/${id}`;
    return AxiosRequest.delete(url);
  },
  create(data?: any) {
    return AxiosRequest.post("/movieType", data);
  },
};
