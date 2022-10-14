import AxiosRequest from "./instance";
export const TicketApi = {
  getAll() {
    return AxiosRequest.get("/tickets");
  },
  removeTiket(id?: any) {
    return AxiosRequest.delete(`tickets/${id}`);
  },
  updateTiket(data?: any) {
    return AxiosRequest.put(`/tickets/${data._id}`, data);
  },
  createTiket(data: any): Promise<any> {
    return AxiosRequest.post("/tickets", data);
  },
  // ticketPrice
  getAllTicketPrice() {
    return AxiosRequest.get("/ticketPrice");
  },
  removeTiketPrice(id?: any) {
    return AxiosRequest.delete(`ticketPrice/${id}`);
  },
  updateTiketPrice(data?: any) {
    return AxiosRequest.put(`/ticketPrice/${data._id}`, data);
  },
  createTiketPrice(data: any): Promise<any> {
    return AxiosRequest.post("/ticketPrice", data);
  },
  /// ticketDetail
  getAllTicketDetail() {
    return AxiosRequest.get("/ticketDetail");
  },
  removeTiketDetail(id?: any) {
    return AxiosRequest.delete(`ticketDetail/${id}`);
  },
  updateTiketDetail(data?: any) {
    return AxiosRequest.patch(`/ticketDetail/${data._id}`, data);
  },
  createTiketDetail(data: any): Promise<any> {
    return AxiosRequest.post("/ticketDetail", data);
  },
};
