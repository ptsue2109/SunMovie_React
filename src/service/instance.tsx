import axios from "axios";
import { auth } from "../firebase";

let accessToken;
try {
  const root = JSON.parse(localStorage.getItem("persist:root") || "");
  const user = JSON.parse(root.authReducer);
  if (user) accessToken = user.accessToken;
} catch (error) {
  console.log(error);
}

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
  timeout: 90000,
  headers: {
    "Authorization": `Bearer ${accessToken}`,
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
    return axiosClient.put(path, data, options);
  },
  delete(path: string, options = {}): Promise<any> {
    return axiosClient.delete(path, options);
  },
};
//rftk with firebase
// const getFirebaseToken: () => any = async () => {
//   // từ request t2 sẽ có token
//   const currentUser = auth.currentUser;
//   if (currentUser) return currentUser.getIdToken();

//   // chưa login => token null
//   const isLogged = localStorage.getItem("isLogged");
//   if (!isLogged) return null;

//   // request đầu tiên chưa có token => wait
//   return new Promise((resolve, reject) => {
//     const waitTimer = setTimeout(() => reject(null), 10000);

//     const unsubcribe = auth.onAuthStateChanged(async (user) => {
//       if (!user) {
//         reject(null);
//       }

//       const token = await user?.getIdToken();
//       resolve(token);
//       unsubcribe();
//       clearTimeout(waitTimer);
//     });
//   });
// };


// axiosClient.interceptors.request.use(
//   async function (config) {
//     const token = await getFirebaseToken();
//     if (token) {
//       config.headers = {
//         authtoken: token,
//       };
//     }
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   },
// );

//rftk with email-pw
// axiosClient.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response.data;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   },
// );








export default axiosClient;
