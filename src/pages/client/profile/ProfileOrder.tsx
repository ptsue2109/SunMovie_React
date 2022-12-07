import { message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ticket from "../../../components/client/Ticket";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getOneOrder } from "../../../redux/slice/OrdersSlice";

type Props = {}

const ProfileOrder = (props: Props) => {
   const { id } = useParams();
   document.title = `Order ${id}`;
   const dispatch = useAppDispatch();
   const [orderDetail, setOrderDetail] = useState<any>();
   const [detail, setDetail] = useState<any>();
   const [totalPriceFinal, setTotalPriceFinal] = useState<any>(0);

   // useEffect(() => {
   //    dispatch(getOneOrder(id));
   // }, [id]);
   // const { order } = useAppSelector((state: any) => state.OrderReducer);
   // if (!order) {
   //    message.error("Lấy thông tin đơn hàng thất bại");
   // }
   // useEffect(() => {
   //    if (order) {
   //       setOrderDetail(order?.order);
   //       setDetail(order?.detail);
   //       let price = (order?.order?.foodDetailId?.totalPrice) + (order?.order?.totalPrice);
   //       setTotalPriceFinal(price);
   //    }
   // }, [order]);
   return (
   <section className="container max-w-6xl px-3 mx-auto  mt-8 justify-center h-[550px] ">
      <div className="mx-auto my-0 flex justify-center h-full items-center bg-[#182b47] rounded-md flex-col" >
        
      </div>
    </section>
   );
};
export default ProfileOrder