import { Button, message, Popconfirm, Space, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../components/admin/Form&Table/Table";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { removeTiket, getTicket } from "../../../redux/slice/ticketSlice";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
type Props = {};

const AdminListTiket = (props: Props) => {
  const dispatch = useAppDispatch();
  const { tickets, isSucess, isFetching, isErr, errorMessage } = useAppSelector(
    (state) => state.ticketReducer
  );

  const deleteTiket = (data: string | undefined) => {
    dispatch(removeTiket(data))
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
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (_: any, { status }: any) => (
        <Tag
          color={status == "active" ? "red" : "blue"}
          key={status >= "active" ? "red" : "blue"}
        >
          {status == true ? "inactive" : "active"}
        </Tag>
      ),
      width: "30px",
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
