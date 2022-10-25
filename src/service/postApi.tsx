
import axiosClient from "./instance";


export const PostApi = {
  getAll(){
    let url = "/post";
    return axiosClient.get(url);
  },
  removeApi(data?: string) {
    let url = `post/${data}`
    return axiosClient.delete(url);
  },
  updateApi(payload: any) {
    const url = `/post/${payload._id}`
    return axiosClient.patch(url, payload)
  },
  create(data: any): Promise<any> {
    return axiosClient.post("/post", data);
  }
};