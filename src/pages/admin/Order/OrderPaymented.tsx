import { Button, Space, Tag } from "antd";
import { Link } from "react-router-dom";
import DataTable from "../../../components/admin/Form&Table/Table";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { formatCurrency, formatDate } from "../../../ultils";
import { EditOutlined } from "@ant-design/icons";
import configRoute from "../../../config";

type Props = {};

const OrderPaymented = (props: Props) => {
   document.title = "Admin | Orders";
   const dispatch = useAppDispatch();

   const { orders } = useAppSelector((state: any) => state.OrderReducer)
   let orderSuccess = orders.filter((item: any) => item?.status === 2);
   const columns = [
      {
         title: "Mã đơn",
         dataIndex: "code",
         render: (_: any, { code, _id }: any) => <Link to={`/admin/orders/${_id}`}>{code}</Link>,

      },
      {
         title: "Trạng thái",
         dataIndex: "status",
         render: (_: any, record: any) => (
            <>
               {record?.status === 0 ? <Tag color="processing">  Chưa thanh toán   </Tag> : record?.status === 1 ? <Tag color="#87d068"> Đã thanh toán  </Tag> : <Tag color="volcano">Đã xuất vé</Tag>}
            </>

         )
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
   const data: Props[] = orderSuccess?.map((item: any, index: any) => {
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
         <Button type='primary' danger className='mb-3'><Link to={configRoute.routes.adminOrderFailed}>Order thanh toán không thành công</Link></Button>
         <div className="flex justify-between">
            <h1 className="text-[20px]" > Order đã xuất vé</h1>
         </div>
         <DataTable column={columns} data={data} />
      </>
   )
}

export default OrderPaymented
