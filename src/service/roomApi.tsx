
import axiosClient from "./instance";


export const RoomApi = {
   getAll() {
      let url = "/rooms";
      return axiosClient.get(url);
   },
   removeRoom(RoomID?: string) {
      let url = `rooms/${RoomID}`
      return axiosClient.delete(url);
   },
   updateRoom(payload: any) {
      const url = `/rooms/${payload._id}`
      return axiosClient.put(url, payload)
   },
   getRoom(RoomID?: string) {
      let url = `rooms/${RoomID}`
      return axiosClient.delete(url);
   },
   create(data?: any) {
      return axiosClient.post("/rooms", data);
    },

};
