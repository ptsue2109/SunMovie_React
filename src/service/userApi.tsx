import { AxiosRequestConfig } from "axios";
import AxiosRequest from "./instance";


export const UserApi = {
   getAll(options: AxiosRequestConfig = {}): Promise<any> {
      let url = "/users";
      return AxiosRequest.get(url, options);
    },
    removeUser(userID?: string) {
      let url = `users/${userID}`
      return AxiosRequest.delete(url);
    },
 };
