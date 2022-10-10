import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Tag, Pagination } from "antd";
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { Link } from "react-router-dom";
import { removeUser, getUsers } from '../../../redux/slice/userSlice';
import DataTable from "../../../components/admin/Form&Table/Table"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"

type Props = {}

const AdminUserList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { users, isSucess, isFetching, isErr, errorMessage } = useAppSelector(state => state.userReducer);

  const deleteUser = (data: string | undefined) => {
    dispatch(removeUser(data)).unwrap()
      .then(() => {
        message.success({ content: "Xoá thành công", key: "handling" });
      })
      .catch(() => {
        message.error({ content: { errorMessage } })
      })
  };
  const columnUserList: any = [
    {
      title: "IMAGE",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: any) => (
        <Link to={`${record?._id}`}>
          
          <img width="40px" height="40px" src={record?.avatar} alt="" />
        </Link>
      ),
      width: 30
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",

      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.email}
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
          {status == "active" ? "inactive" : "active"}
        </Tag>
      ),
      width: '30px',

    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      render: (_: any, { role }: any) => (
        <p>{role === 0 ? 'admin' : 'user'}</p>
      ),
      width: 30
    },
    {
      title: "NAME",
      dataIndex: "username",
      key: "username",
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.username}
          </Link>
        </div>
      ),

    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
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
            title={`Delete ${record?.username ?? record?._id}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => deleteUser(record?._id)}
          >
            <DeleteOutlined style={{ color: 'red', fontSize: '18px' }} />
          </Popconfirm>
        </Space>
      ),
      width: 30
    },
  ];

  const data: Props[] = users?.map((item: any, index: any) => {
    console.log(item.avatar)
    return {
      key: index + 1,
      _id: item?._id,
      username: item?.username,
      fullname: item?.fullname,
      email: item?.email,
      avatar:  item?.avatar ? item?.avatar : `${import.meta.env.VITE_HIDDEN_SRC}`,
      phone: item?.phone,
      address: item?.address,
      role: item?.role,

    }
  });


  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="add">Add Users</Link>
      </Button>
      <DataTable column={columnUserList} data={data} loading={isFetching} />

    </div>
  )
}
export default AdminUserList