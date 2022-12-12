import { Button, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../components/admin/Form&Table/Table";
import configRoute from "../../../config";
import { useAppSelector } from "../../../redux/hook";
import { formatCurrency, formatDate } from "../../../ultils";
import { EditOutlined } from "@ant-design/icons";

type Props = {};

const FailedOrder = (props: Props) => {
   const { orders } = useAppSelector((state: any) => state.OrderReducer)
   let orderFailed = orders.filter((item: any) => item?.status !== 1);

   const columns = [
      {
         title: "Mã đơn",
         dataIndex: "code",
         render: (_: any, { code, _id }: any) => <Link to={`/admin/orders/${_id}`}>{code}</Link>,

      },
      {
         title: "Trạng thái",
         dataIndex: "status",
         render: (_: any, record: any) => <p>{record?.status === 0 ? 'Chưa thanh toán  ' : record?.status === 1 ? "Đã thanh toán" : "Đã xuất vé"}</p>,
      },
      {
         title: "Ngày tạo",
         dataIndex: "createdAt",
         render: (_: any, { createdAt }: any) => <p>{formatDate(createdAt)}</p>,
      },
      {
         title: "Tổng tiền",
         dataIndex: "totalPrice",
         render: (_: any, { totalPrice }: any) => formatCurrency(totalPrice),
      },
      {
         title: "Người đặt",
         dataIndex: "userId",
         render: (_: any, { userId }: any) => <Link to={`/admin/users/${userId?._id}`}>{userId?.email}</Link>,
      },
      {
         title: "Vé",
         dataIndex: "ticket",
      },
      {
         title: "ACTION",
         key: "action",
         fixed: "right",
         render: (_: any, record: any) => (
            <Space size="middle">
               <Link to={`/orders/${record._id}`}>
                  <EditOutlined
                     style={{ color: "var(--primary)", fontSize: "18px" }}
                  />
               </Link>

            </Space>
         ),
         width: 250,
      },
   ]
   const data: Props[] = orderFailed?.map((item: any, index: any) => {
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
         <Button type='primary' className='mb-3'><Link to={configRoute.routes.adminOrders}>Order thanh toán thành công</Link></Button>
         <DataTable column={columns} data={data} />
      </>
   )
}

export default FailedOrder
