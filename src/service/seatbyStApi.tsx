
import { AxiosRequestConfig } from "axios";
import axiosClient, { AxiosRequest } from "./instance";


export const seatByShowTime = {
  create(data: any): Promise<any> {
    return axiosClient.post("/seats", data);
  },

  getAll(options: AxiosRequestConfig = {}): Promise<any> {
    return AxiosRequest.get("/setByShowTime", options);
  },
  getOneByid(roomId: any): Promise<any> {
    const url = `seatsByRoom/${roomId}`
    return axiosClient.get(url)
  }

};