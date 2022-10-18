
import axiosClient from "./instance";


export const SeatTypeApi = {
  getAll(){
    let url = "/seatType";
    return axiosClient.get(url);
  },
 
};
