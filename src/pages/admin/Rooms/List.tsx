import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Tag, Pagination, Select, Tooltip } from "antd";
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { Link } from "react-router-dom";
import {  removeRoom, updateRoom, getRooms } from '../../../redux/slice/roomSlice';
import DataTable from "../../../components/admin/Form&Table/Table"
import { DeleteOutlined, EditOutlined , EyeOutlined} from "@ant-design/icons"
const { Option } = Select;
type Props = {}

const AdminRoomList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { rooms, isFetching, isErr, errorMessage } = useAppSelector((state: { roomReducer: any; }) => state.roomReducer);
  useEffect(() => { 
    document.title = "Admin | Rooms"
    dispatch(getRooms())
   }, [dispatch])

  const deleteData = (data: string | undefined) => {
    dispatch(removeRoom(data)).unwrap()
      .then(() => {
        message.success({ content: "Xoá thành công", key: "handling" });
      })
      .catch(() => {
        message.error({ content: { errorMessage } })
      })
  };

  const changeScreen = (id: any, val: any) => {
    dispatch(updateRoom({ _id: id, screen: val })).unwrap().then(() => message.success('Thay đổi màn chiếu thành công'))
  }
  const columns: any = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.name}
          </Link>
        </div>
      ),
    },
    {
      title: "QuantitySeat",
      dataIndex: "tongGhe",
      key: "tongGhe",
    },
    {
      title: "SeatColumn",
      dataIndex: "columns",
      key: "columns",
    },
    {
      title: "SeatRow",
      dataIndex: "rows",
      key: "rows",
    },
    {
      title: "ACTION",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
        <Tooltip title="Chỉnh sửa ">
          <Link to={`${record?._id}`}>
            <EditOutlined style={{ color: 'var(--primary)', fontSize: '18px' }} />
          </Link>
        </Tooltip>
        <Tooltip title="Xóa" >
          <Popconfirm
            title={`Xem ${record?.username ?? record?._id}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => deleteData(record?._id)}
          >
            <DeleteOutlined style={{ color: 'red', fontSize: '18px' }} />
          </Popconfirm>
        </Tooltip>
        <Tooltip title="Xem ghế ">
          <Link to={`/admin/seatsByRoom/${record?._id}`}>
            <EyeOutlined style={{ color: 'var(--primary)', fontSize: '18px' }} />
          </Link>
        </Tooltip>
      </Space>
      ),
      width: 130
    },
  ];
 
  const data: Props[] = rooms?.map((item: any, index: any) => {
    console.log('item', item)
    return {
      key: index + 1,
      _id: item?._id,
      name: item?.name,
      columns: item?.columns,
      rows: item?.rows,
      seats: item?.seats,
      tongGhe: item?.rows * item?.columns,
    }
  });



  useEffect(() => {
    if (isErr) {
      message.error({ content: `Failed: ${errorMessage} `, key: "handling" });
    }
  }, []);
  
  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="create">Add Rooms</Link>
      </Button>
      <DataTable column={columns} data={data} loading={isFetching} />

    </div>
  )
}

export default AdminRoomList