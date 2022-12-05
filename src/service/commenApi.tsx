import AxiosRequest from "./instance";

export const Comenter = {
  getAll() {
    return AxiosRequest.get("/comment");
  },
  remove(id?: any) {
    return AxiosRequest.delete(`comment/${id}`);
  },
  create(data?: any) {
    return AxiosRequest.post("/comment", data);
  },

  getOne(slug: any) {
    return AxiosRequest.get(`/comment/${slug}`);
  },
};
