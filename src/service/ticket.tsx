import axiosClient from "./instance";

export const TicketApi = {
  getAll() {
    let url = "/tickets";
    return axiosClient.get(url);
  },
  removeTiket(tiketID?: string) {
    let url = `tickets/${tiketID}`;
    return axiosClient.delete(url);
  },
  updateTiket(payload: any) {
    const url = `/tickets/${payload._id}`;
    return axiosClient.put(url, payload);
  },
  createTiket(data: any): Promise<any> {
    return axiosClient.post("/tickets", data);
  },
  // ticketPrice
  getAllTicketPrice() {
    let url = "/ticketPrice";
    return axiosClient.get(url);
  },
  removeTiketPrice(tiketID?: string) {
    let url = `ticketPrice/${tiketID}`;
    return axiosClient.delete(url);
  },
  updateTiketPrice(payload: any) {
    const url = `/ticketPrice/${payload._id}`;
    return axiosClient.put(url, payload);
  },
  createTiketPrice(data: any): Promise<any> {
    return axiosClient.post("/ticketPrice", data);
  },
};
