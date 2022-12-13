import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../redux/hook';
import OrderTable from './OrderTable';

type Props = {}

const OrderTab = (props: Props) => {
   document.title = "Admin | Orders";
   const { orders } = useAppSelector((state: any) => state.OrderReducer);
   const [orderSuccess, setOrderSuccess] = useState<any[]>([]);
   const [orderFailed, setOrderFailed] = useState<any[]>([]);
   const [orderXuatVe, setOrderXuatVe] = useState<any[]>([]);
   useEffect(() => {
      if (orders) {
         let a = orders?.filter((item: any) => item?.status === 0);
         let b = orders?.filter((item: any) => item?.status === 1);
         let c = orders?.filter((item: any) => item?.status === 2);
         setOrderSuccess(b);
         setOrderFailed(a);
         setOrderXuatVe(c)
      }
   }, [orders])
   const items: any[] = [
      {
         key: 1,
         label: "Đơn thanh toán thành công",
         children: <OrderTable data={orderSuccess} />
      },
      {
         key: 2,
         label: "Đơn thanh toán Lỗi / Chưa thanh toán",
         children: <OrderTable data={orderFailed} />
      },
      {
         key: 3,
         label: "Đã xuất vé",
         children: <OrderTable data={orderXuatVe} />
      }
   ]
   return (
      <>
         <Tabs
            defaultActiveKey="1"
            size={"small"}
            style={{ marginBottom: 32 }}
            items={items}
         />
      </>
   )
}

export default OrderTab