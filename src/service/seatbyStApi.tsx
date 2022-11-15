import axiosClient from "./instance";

export const seatByShowTime = {
  create(data: any): Promise<any> {
    return axiosClient.post("/setByShowTime", data);
  },
  getAll(): Promise<any> {
    return axiosClient.get("/setByShowTime");
  },
  getOneByid(id: any): Promise<any> {
    const url = `setByShowTime/${id}`;
    return axiosClient.get(url);
  },
  updateSeatByST(item: any) {
    return axiosClient.put(`/setByShowTime/${item._id}`, item);
  },
};
