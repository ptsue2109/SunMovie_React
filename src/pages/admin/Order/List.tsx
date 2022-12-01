import { Button, Space } from 'antd';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import DataTable from '../../../components/admin/Form&Table/Table';
import configRoute from '../../../config';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { formatCurrency, formatDate } from '../../../ultils';
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

type Props = {}

const AdminOrders = (props: Props) => {
   document.title = "Admin | Orders";
   const dispatch = useAppDispatch()

   const { orders } = useAppSelector((state) => state.OrderReducer)
   console.log(orders);

   const columns = [
      {
         title: "Order Code",
         dataIndex: "code",
         render: (_: any, { code }: any) => <Link to={`/admin/code/${code}`}>{code}</Link>,

      },
      {
         title: "status",
         dataIndex: "status",
         render: (_: any, record: any) => <p>{record?.status === 1 ? 'Đã thanh toán' : "chưa thanh toán"}</p>,
      },
      {
         title: "createdAt",
         dataIndex: "createdAt",
         render: (_: any, { createdAt }: any) => <p>{formatDate(createdAt)}</p>,
      },
      {
         title: "totalPrice",
         dataIndex: "totalPrice",
         render: (_: any, { totalPrice }: any) => formatCurrency(totalPrice),
      },
      {
         title: "User",
         dataIndex: "userId",
         render: (_: any, { userId }: any) => <Link to={`/admin/users/${userId?._id}`}>{userId?.email}</Link>,
      },
      {
         title: "Ticket",
         dataIndex: "ticket",
      },
      {
         title: "ACTION",
         key: "action",
         fixed: "right",
         render: (_: any, record: any) => (
           <Space size="middle">
             <Link to={`${record._id}`}>
               <EditOutlined
                 style={{ color: "var(--primary)", fontSize: "18px" }}
               />
             </Link>
             
           </Space>
         ),
         width: 250,
       },
   ]
   const data: Props[] = orders?.map((item: any, index: any) => {
      return {
         key: index + 1,
         _id: item?._id,
         status: item?.status,
         createdAt: item?.createdAt,
         qrCode: item?.qrCode,
         ticketId: item?.ticketId,
         totalPrice: item?.totalPrice,
         userId: item?.userId,
         ticket: item?.ticketId?.quantity,
         code: item?.shortId
      };
   });
   return (
      <>
         <Button>
            <Link to={configRoute.routes.adminOrders}></Link>
         </Button>

         <DataTable column={columns} data={data} />

      </>
   )
}

export default AdminOrders