import axiosClient from "./instance";

export const UserApi = {
  getAll() {
    let url = "/users";
    return axiosClient.get(url);
  },
  removeUser(userID?: string) {
    let url = `users/${userID}`
    return axiosClient.delete(url);
  },
  updateUser(payload: any) {
    const url = `/users/${payload._id}`
    return axiosClient.put(url, payload)
  },
  create(data: any): Promise<any> {
    return axiosClient.post("/register", data);
  },
  updatePassword(payload: any) {
    const url = `/users/passwordUpdate/${payload._id}`
    return axiosClient.put(url, payload)
  },
};
