import { message, Space, Popconfirm, Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { removeSeatType } from "../../../redux/slice/SeatTypeSlice";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DataTable from "../../../components/admin/Form&Table/Table";
import configRoute from "../../../config";
type Props = {};

const ListSeatType = (props: Props) => {
  const dispatch = useAppDispatch();
  const { seatType, isErr, isFetching, isSucess } = useAppSelector(
    (state) => state.seatTypeReducer
  );
  const deleteUser = (id: any) => {
    dispatch(removeSeatType(id))
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
      title: "extraPrice",
      render: (item: any, index: any) => <p>{item.extraPrice} VNĐ</p>,
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
            title={`Delete ${item?.movieName ?? item?._id}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => deleteUser(item?._id)}
          >
            <DeleteOutlined style={{ color: "red", fontSize: "18px" }} />
          </Popconfirm>
        </Space>
      ),
      width: 30,
    },
  ];
  const data = seatType?.map((item: any) => {
    return {
      _id: item._id,
      name: item.name,
      extraPrice: item.extraPrice,
    };
  });
  return (
    <>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={configRoute.routes.adminSeatTypeAdd}>Add Seat Type</Link>
      </Button>
      <DataTable column={columnList} data={data} loading={isFetching} />
    </>
  );
};

export default ListSeatType;
