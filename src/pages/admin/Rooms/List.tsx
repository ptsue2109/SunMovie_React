import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Tag, Pagination } from "antd";
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { Link } from "react-router-dom";
import { removeRoom } from '../../../redux/slice/roomSlice';
import DataTable from "../../../components/admin/Form&Table/Table"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"


type Props = {}

const AdminRoomList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { rooms, isFetching, isErr, errorMessage } = useAppSelector(state => state.roomReducer);
  console.log(rooms);
  useEffect(() => { document.title = "Admin | Rooms" }, [])

  const deleteData = (data: string | undefined) => {

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
      title: "Screen",
      dataIndex: "screen",
      key: "screen",
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
      title: "gheKhaDung",
      dataIndex: "gheKhaDung",
      key: "gheKhaDung",
    },
    {
      title: "gheBiAn",
      dataIndex: "gheBiAn",
      key: "gheBiAn",
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
    console.log(rooms)
    return {
      key: index + 1,
      _id: item?._id,
      name: item?.name,
      columns: item?.columns,
      rows: item?.rows,
      screen: item?.screen,
      seats: item?.seats,
      tongGhe: 12,
      gheKhaDung: 11,
      gheBiAn: 1
    }
  });

  useEffect(() => {
    if (isErr) {
      message.error({ content: `Failed: ${errorMessage} `, key: "handling" });
    }
  }, [isErr])
  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="add">Add Rooms</Link>
      </Button>
      <DataTable column={columns} data={data} loading={isFetching} />

    </div>
  )
}

export default AdminRoomList