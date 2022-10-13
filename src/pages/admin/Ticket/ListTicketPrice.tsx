import { Button, message, Popconfirm, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../components/admin/Form&Table/Table";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { removeTicketPrice } from "../../../redux/slice/ticketPriceSlice";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
type Props = {};

const ListTicketPrice = (props: Props) => {
  const dispatch = useAppDispatch();
  const { ticketPrice, isErr, isFetching, isSucess } = useAppSelector(
    (state) => state.ticketPriceReducer
  );
  const deleteTicketPrice = (id: any) => {
    dispatch(removeTicketPrice(id))
      .unwrap()
      .then(() => message.success({ content: "Xóa thành công" }))
      .catch(() => message.error({ content: "lỗi" }));
  };
  const columnList: any = [
    {
      title: "name",
      render: (item: any, index: any) => <p>{item.name}</p>,
      height: "10",
    },
    {
      title: "price",
      render: (item: any, index: any) => <p>{item.price}</p>,
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
            title={`Delete ${item?.name ?? item?._id}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => deleteTicketPrice(item?._id)} //
          >
            <DeleteOutlined style={{ color: "red", fontSize: "18px" }} />
          </Popconfirm>
        </Space>
      ),
      width: 30,
    },
  ];
  const data = ticketPrice?.map((item: any) => {
    return {
      _id: item._id,
      name: item.name,
      price: item.price,
    };
  });
  return (
    <>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={configRoute.routes.adminTicketPriceAdd}>Add TicketPrice</Link>
      </Button>
      <DataTable column={columnList} data={data} loading={isFetching} />
    </>
  );
};

export default ListTicketPrice;
