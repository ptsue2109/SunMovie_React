import React, { useEffect } from 'react';
import { Button, message, Popconfirm, Space, Table, Tag } from "antd";
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { Link } from "react-router-dom";
import { UserApi } from '../../../service/userApi';
import DataTable from "../../../components/admin/Form&Table/Table"
type Props = {}

const AdminUserList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { users, isSucess , isFetching, isErr} = useAppSelector(state => state.userReducer);
  console.log('users', users)



  const columnUserList: any = [
    {
      title: "IMAGE",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: any) => (
        <Link to={`${record?._id}/edit`}>
          <img width="40px" src={record?.image} alt="" />
        </Link>
      ),
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}/edit`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.email}
          </Link>
        </div>
      ),
    },
    {
      title: "DISPLAY",
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
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      render: (_: any, { role }: any) => (
        <p>{role === 1 ? 'admin' : 'user'}</p>
      )

    },
    {
      title: "NAME",
      dataIndex: "username",
      key: "username",
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}/edit`}
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
          <Button type="primary">
            <Link to={`${record._id}/edit`}>Edit</Link>
          </Button>
          <Popconfirm
            title={`Delete ${record.brandName}?`}
            okText="OK"
            cancelText="Cancel"

          >
            <Button type="dashed" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: Props[] = users?.map((item: any, index: any) => {
    return {
      key: index + 1,
      _id: item?._id,
      username: item?.username,
      fullname: item?.fullname,
      email: item?.email,
      avatar: item?.avatar[0] ?? "",
      phone: item?.phone,
      address: item?.address,
      role: item?.role
    }
  });



  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="add">Add Users</Link>
      </Button>
      <DataTable column={columnUserList} data={data}  loading={isFetching}/>
    </div>
  )
}
export default AdminUserList