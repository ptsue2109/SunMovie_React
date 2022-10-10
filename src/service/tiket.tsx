import axiosClient from "./instance";

export const TiketApi = {
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
    return axiosClient.patch(url, payload);
  },
  createTiket(data: any): Promise<any> {
    return axiosClient.post("/tickets", data);
  },
};
