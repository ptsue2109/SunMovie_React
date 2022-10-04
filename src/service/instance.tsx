import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AxiosRequest = {
  post(path: string, data: {}, options = {}): Promise<any> {
    return axiosClient.post(path, data, options);
  },
  get(path: string, options = {}): Promise<any> {
    return axiosClient.get(path, options);
  },
  put(path: string, data: {}, options = {}): Promise<any> {
    return axiosClient.patch(path, data, options);
  },
  delete(path: string, options = {}): Promise<any> {
    return axiosClient.delete(path, options);
  },
};


export default axiosClient;
