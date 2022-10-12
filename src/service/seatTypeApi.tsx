import AxiosRequest from "./instance";

export const SeatTypeApi = {
  getAll() {
    return AxiosRequest.get("/seatType");
  },
  removeSeatType(id?: any) {
    let url = `seatType/${id}`;
    return AxiosRequest.delete(url);
  },
  createSeatType(data?: any) {
    return AxiosRequest.post("/seatType", data);
  },
  updateSeatType(payload: any) {
    const url = `/seatType/${payload._id}`;
    return AxiosRequest.patch(url, payload);
  },
};
