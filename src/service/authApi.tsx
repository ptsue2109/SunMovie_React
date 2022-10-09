
import AxiosRequest from "./instance";


export const AuthApi = {
   async register(data: any): Promise<any> {
     return AxiosRequest.post("/register", data);
   },
   async login(data:any): Promise<any>{
    return AxiosRequest.post("/login", data);
   }
 };
