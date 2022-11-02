
import axiosClient from "./instance";


export const showTimetApi = {
  getAll(){
    let url = "/showTime";
    return axiosClient.get(url);
  },
  removeApi(data?: string) {
    let url = `showTime/${data}`
    return axiosClient.delete(url);
  },
  updateApi(payload: any) {
    const url = `/showTime/${payload._id}`
    return axiosClient.put(url, payload)
  },
  create(data: any): Promise<any> {
    return axiosClient.post("/showTime", data);
  }
};