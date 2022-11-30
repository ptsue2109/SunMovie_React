import React, { useEffect, useState } from "react";
import {
  Button,
  message,
  Popconfirm,
  Space,
  Tag,
  Pagination,
  Select,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { Link } from "react-router-dom";
import {
  removeUser,
  updateUser,
  getUsers,
} from "../../../redux/slice/userSlice";
import DataTable from "../../../components/admin/Form&Table/Table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { userRole, userStatus } from "../../../ultils/data";
import { provices } from "../../../redux/slice/Provider";
import { formatDate } from "../../../ultils";
type Props = {};
const { Option } = Select;
const AdminUserList = (props: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.title = "Admin | Users";
    dispatch(getUsers());
  }, [dispatch]);

  const { users, isFetching, isErr, errorMessage } = useAppSelector(
    (state) => state.userReducer
  );

  const { currentUser } = useAppSelector((state: any) => state.authReducer)
  console.log(currentUser?._id);


  const deleteUser = (data: string | undefined) => {
    dispatch(removeUser(data))
      .unwrap()
      .then(() => {
        message.success({
          content: "Xoá thành công",
          key: "handling",
        });
      })
      .catch(() => {
        message.error({ content: { errorMessage } });
      });
  };
  const changeRole = (id: any, value: any) => {
    dispatch(updateUser({ _id: id, role: value }))
      .unwrap()
      .then(() => message.success("Thay đổi quyền thành công hùng đẹp trai"));
  };
  const changeStatus = (id: any, value: any) => {
    dispatch(updateUser({ _id: id, status: value }))
      .unwrap()
      .then(() =>
        message.success("Thay đổi trạng thái thành công hùng đẹp trai")
      );
  };
  const changeAddress = (id: any, value: any) => {
    dispatch(updateUser({ _id: id, address: value }))
      .unwrap()
      .then(() => message.success("Thay đổi điạ chỉ thành công"));
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
      width: 30,
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
      sorter: (a: any, b: any) => a.email - b.email,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (_: any, { _id, status }: any) => (
        <Select
          value={
            status === 0
              ? "Chưa xác thực"
              : status === 1
                ? "Đang hoạt động"
                : "Dừng hoạt động"
          }
          onChange={(value: any) => {
            changeStatus(_id, value);
          }}
        >
          {userStatus?.map((item: any) => (
            <Option value={item?.value} key={item?.value}>
              {item?.name}
            </Option>
          ))}
        </Select>
      ),
      width: "30px",
      sorter: (a: any, b: any) => a.status - b.status,
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      render: (_: any, { role, _id }: any) => (
        <Select
          value={role === 0 ? "user" : "admin"}
          onChange={(value: any) => {
            changeRole(_id, value);
          }}
        >
          {userRole?.map((item: any) => (
            <Option value={item?.value} key={item?.value}>
              {item?.name}
            </Option>
          ))}
        </Select>
      ),
      sorter: (a: any, b: any) => a.role - b.role,
      width: 30,
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
      sorter: (a: any, b: any) => a.username - b.username,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a: any, b: any) => a.phone - b.phone,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (_: any, { address, _id }: any) => (
        <Select
          value={address}
          onChange={(value: any) => {
            changeAddress(_id, value);
          }}
        >
          {provices?.map((item: any) => (
            <Option value={item?.codename} key={item?.codename}>
              {item?.name}
            </Option>
          ))}
        </Select>
      ),
      sorter: (a: any, b: any) => a.address - b.address,

      width: 30,
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
          {(currentUser?._id !== record?._id)  && (
            <Popconfirm
              title={`Delete ${record?.username ?? record?._id}?`}
              okText="OK"
              cancelText="Cancel"
              onConfirm={() => deleteUser(record?._id)}
            >
              <DeleteOutlined style={{ color: "red", fontSize: "18px" }} />
            </Popconfirm>
          )}
        </Space>
      ),
      width: 30,
    },
  ];

  const data: Props[] = users?.map((item: any, index: any) => {
    return {
      key: index + 1,
      _id: item?._id,
      username: item?.username,
      fullname: item?.fullname,
      email: item?.email,
      avatar: item?.avatar[0]?.url ?? `${import.meta.env.VITE_HIDDEN_SRC}`,
      phone: item?.phone,
      address: item?.address,
      role: item?.role,
      status: item?.status,
    };
  });

  useEffect(() => {
    if (isErr) {
      message.error({ content: `Failed: ${errorMessage} `, key: "handling" });
    }
  }, [isErr]);
  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="add">Add Users</Link>
      </Button>
      <DataTable column={columnUserList} data={data} loading={isFetching} />
    </div>
  );
};
export default AdminUserList;
