import AxiosRequest from "./instance";

export const CategoriesApi = {
  getAll() {
    return AxiosRequest.get("/categories");
  },
  remove(id?: any) {
    return AxiosRequest.delete(`categories/${id}`);
  },
  create(data?: any) {
    return AxiosRequest.post("/categories", data);
  },
  edit(data: any) {
    return AxiosRequest.patch(`/categories/${data._id}`, data);
  },
};
