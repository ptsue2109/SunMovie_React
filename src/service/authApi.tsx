
import AxiosRequest from "./instance";


export const AuthApi = {
   async register(data: any): Promise<any> {
     return AxiosRequest.post("/register", data);
   },
   async getList(): Promise<any> {
    return AxiosRequest.get("/users");
   },
   async login(data:any): Promise<any>{
    return AxiosRequest.post("/login", data);
   }
 };
