import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Tag, Pagination, Select } from "antd";
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { Link } from "react-router-dom";
import {  removeRoom, updateRoom } from '../../../redux/slice/roomSlice';
import DataTable from "../../../components/admin/Form&Table/Table"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { screenData } from "../../../ultils/data"
const { Option } = Select;
type Props = {}

const AdminRoomList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { rooms, isFetching, isErr, errorMessage } = useAppSelector(state => state.roomReducer);
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
      title: "Screen",
      dataIndex: "screen",
      key: "screen",
      render: (_: any, { screen, _id }: any) => (
        <div>
          <Select value={screen == 0 ? 'Imax' : screen == 1 ? 'ScreenX' : screen == 2 ? 'Curved Screen' : 'Normal'} style={{ width: 120 }}
            onChange={(value: any) => { changeScreen(_id, value) }}>
            {screenData?.map((item: any) => (
              <Option value={item?.value} key={item?.value}  >{item?.name}</Option>
            ))}
          </Select>
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
    return {
      key: index + 1,
      _id: item?._id,
      name: item?.name,
      columns: item?.columns,
      rows: item?.rows,
      screen: item?.screen,
      seats: item?.seats,
      tongGhe: item?.rows * item?.columns,
      gheKhaDung: ((item?.rows * item?.columns) - item?.blockSeat),
      gheBiAn: item?.blockSeat
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
        <Link to="create">Add Rooms</Link>
      </Button>
      <DataTable column={columns} data={data} loading={isFetching} />

    </div>
  )
}

export default AdminRoomList