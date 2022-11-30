// getTicketDetailByShowTime
import AxiosRequest from "./instance";
export const TicketDetailApi = {
  getAll() {
    return AxiosRequest.get("/tickets");
  },
  removeTiketDetail(id?: any) {
    return AxiosRequest.delete(`tickets/${id}`);
  },
  updateTiketDetail(data?: any) {
    return AxiosRequest.put(`/tickets/${data._id}`, data);
  },
  createTiketDetail(data: any): Promise<any> {
    return AxiosRequest.post("/tickets", data);
  },
  getTicketDetailByShowTime(id: any) {
    return AxiosRequest.get(`/getTicketDetailByShowTime/${id}`);
  },
};
