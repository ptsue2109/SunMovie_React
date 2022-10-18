
import axiosClient from "./instance";


export const SeatApi = {
  getAll(){
    let url = "/seats";
    return axiosClient.get(url);
  },
  remove(seatId?: string) {
    let url = `seats/${seatId}`
    return axiosClient.delete(url);
  },
  update(payload: any) {
    const url = `/seats/${payload._id}`
    return axiosClient.put(url, payload)
  },
  create(data: any): Promise<any> {
    return axiosClient.post("/seats", data);
  }
};
