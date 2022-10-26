import { Button, message, Popconfirm, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../components/admin/Form&Table/Table";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { removeTicketDetail } from "../../../redux/slice/ticketDetailSlice";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
type Props = {};

const ListTicketDetail = (props: Props) => {
  const dispatch = useAppDispatch();
  const { ticketDetail, isErr, isFetching, isSucess } = useAppSelector(
    (state) => state.ticketDetailReducer
  );
  const { tickets } = useAppSelector((state) => state.ticketReducer);
  const deleteTicketDetail = (id: any) => {
    dispatch(removeTicketDetail(id))
      .unwrap()
      .then(() => message.success({ content: "Xóa thành công" }))
      .catch(() => message.error({ content: "lỗi" }));
  };
  const columnList: any = [
    {
      title: "ticketId",
      render: (item: any, index: any) => <p>{item.ticketId}</p>,
      height: "10",
    },
    {
      title: "Quantity",
      render: (item: any, index: any) => <p>{item.quantity}</p>,
      height: "10",
    },
    {
      title: "ACTION",
      key: "action",
      render: (_: any, item: any) => (
        <Space size="middle">
          <Link to={`${item._id}`}>
            <EditOutlined
              style={{ color: "var(--primary)", fontSize: "18px" }}
            />
          </Link>
          <Popconfirm
            title={`Delete ${item?.ticketId ?? item?._id}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => deleteTicketDetail(item?._id)} //
          >
            <DeleteOutlined style={{ color: "red", fontSize: "18px" }} />
          </Popconfirm>
        </Space>
      ),
      width: 30,
    },
  ];
  const data = ticketDetail?.map((item: any) => {
    return {
      _id: item._id,
      ticketId: item.ticketId,
      quantity: item.quantity,
    };
  });
  return (
    <>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={configRoute.routes.adminTicketPriceAdd}>
          Add TicketDetail
        </Link>
      </Button>
      <DataTable column={columnList} data={data} loading={isFetching} />
    </>
  );
};

export default ListTicketDetail;
