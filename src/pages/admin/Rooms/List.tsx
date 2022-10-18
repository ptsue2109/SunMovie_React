import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Tag, Pagination } from "antd";
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { Link } from "react-router-dom";
import { removeRoom } from '../../../redux/slice/RoomSlice';
import DataTable from "../../../components/admin/Form&Table/Table"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
type Props = {}

const List = (props: Props) => {
  const dispatch = useAppDispatch();
  const { rooms, errorMessage } = useAppSelector(state => state.roomReducer);
  const deleteData = (data: string | undefined) => {
    console.log(data);
    
    dispatch(removeRoom(data)).unwrap()
      .then(() => {
        message.success({ content: "Xoá thành công", key: "handling" });
      })
      .catch(() => {
        message.error({ content: { errorMessage } })
      })
  };
  const columns: any = [

    {
      title: "name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => (
        <>
          <Link
            to={`${record?._id}`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.name}
          </Link>
        </>
      ),

    },
    {
      title: "Columns",
      dataIndex: "columns",
      key: "columns"
    },
    {
      title: "Screens",
      dataIndex: "screen",
      key: "screen"
    },
    {
      title: "Rows",
      dataIndex: "rows",
      key: "rows"
    },
    {
      title: "Tổng ghế",
      dataIndex: "totalSeat",
      key: "totalSeat"
    },
    {
      title: "Ghế khả dụng",
      dataIndex: "activeSeat",
      key: "activeSeat"
    },
    {
      title: "Ghế bị ẩn",
      dataIndex: "disableSeat",
      key: "disableSeat"
    },
    {
      title: "ACTION",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link to={`${record._id}`}>
            <EditOutlined style={{ color: 'var(--primary)', fontSize: '18px' }} />
          </Link>
          <Popconfirm
            title={`Delete ${record?.name ?? record?._id}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => deleteData(record?._id)}
          >
            <DeleteOutlined style={{ color: 'red', fontSize: '18px' }} />
          </Popconfirm>
        </Space>
      ),
      width: 30
    },
  ];

  const data: Props[] = rooms?.map((item: any, index: any) => {
    return {
      key: index + 1,
      _id: item?._id,
      name : item?.name,
      rows: item?.rows,
      columns: item?.columns,
      screen: item?.screen,
      seats: item?.seats,
      totalSeat: 12,
      activeSeat: 10,
      disableSeat: 2

    }
  });
  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="create">Add Rooms</Link>
      </Button>
      <DataTable column={columns} data={data} />


    </div>
  )
}

export default List