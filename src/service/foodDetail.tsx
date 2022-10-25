import axiosClient from "./instance";
export const foodDetailApi = {
  getAll() {
    let url = "/foodDetail";
    return axiosClient.get(url);
  },
  removeApi(data?: string) {
    let url = `foodDetail/${data}`;
    return axiosClient.delete(url);
  },
  updateApi(data: any) {
    const url = `/foodDetail/${data._id}`;
    return axiosClient.patch(url, data);
  },
  create(data: any): Promise<any> {
    return axiosClient.post("/foodDetail", data);
  },
};
