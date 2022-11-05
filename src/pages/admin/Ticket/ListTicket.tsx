import { Button, message, Popconfirm, Select, Space, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../components/admin/Form&Table/Table";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  removeTicket,
  getTicket,
  updateTiket,
} from "../../../redux/slice/ticketSlice";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { tickKetStatus } from "../../../ultils/data";
import { Option } from "antd/lib/mentions";
type Props = {};

const AdminListTiket = (props: Props) => {
  const dispatch = useAppDispatch();
  const { tickets, isSucess, isFetching, isErr, errorMessage } = useAppSelector(
    (state) => state.ticketReducer
  );
  const changeStatus = (id: any, value: any) => {
    dispatch(updateTiket({ _id: id, status: value }))
      .unwrap()
      .then(() => message.success("Thay đổi trạng thái thành công"));
  };

  const deleteTiket = (data: string | undefined) => {
    dispatch(removeTicket(data))
      .then(() => {
        message.success({ content: "Xoá thành công", key: "handling" });
      })
      .catch(() => {
        message.error({ content: { errorMessage } }); //
      });
  };

  const columnUserList: any = [
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.date}
          </Link>
        </div>
      ),
      width: 30,
    },
    {
      title: "totalPrice",
      dataIndex: "totalPrice",
      key: "totalPrice",

      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.totalPrice}
          </Link>
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_: any, { _id, status }: any) => (
        <Select
          value={status === true ? "Active" : "Inactive"}
          onChange={(value: any) => {
            changeStatus(_id, value);
          }}
        >
          {tickKetStatus?.map((item: any) => (
            <Option value={item?.value} key={item?.value}>
              {item?.name}
            </Option>
          ))}
        </Select>
      ),
    },

    {
      title: "showtimeId",
      dataIndex: "showtimeId",
      key: "showtimeId",
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.showtimeId}
          </Link>
        </div>
      ),
    },
    {
      title: "seatId",
      dataIndex: "seatId",
      key: "seatId",
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.seatId}
          </Link>
        </div>
      ),
    },
    {
      title: "ticketPriceId",
      dataIndex: "ticketPriceId",
      key: "address",
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.ticketPriceId}
          </Link>
        </div>
      ),
    },
    {
      title: "userId",
      dataIndex: "userId",
      key: "userId",
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.userId}
          </Link>
        </div>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link to={`${record._id}`}>
            <EditOutlined
              style={{ color: "var(--primary)", fontSize: "18px" }}
            />
          </Link>
          <Popconfirm
            title={`Delete ${record?.username ?? record?._id}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => deleteTiket(record?._id)}
          >
            <DeleteOutlined style={{ color: "red", fontSize: "18px" }} />
          </Popconfirm>
        </Space>
      ),
      width: 30,
    },
  ];
  const data: Props[] = tickets.map((item: any, index: any) => {
    console.log(tickets);

    return {
      key: index + 1,
      _id: item?._id,
      totalPrice: item?.totalPrice,
      showtimeId: item?.showtimeId,
      seatId: item?.seatId,
      ticketPriceId: item?.ticketPriceId,
      userId: item?.userId,
      role: item?.role,
      date: item?.date,
      status: item?.status,
    };
  });

  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="add">Add Users</Link>
      </Button>
      <DataTable column={columnUserList} data={data} loading={isFetching} />
    </div>
  );
};

export default AdminListTiket;
