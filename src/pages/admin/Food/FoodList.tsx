import React, { useEffect, useState } from "react";
import {
  Button,
  message,
  Popconfirm,
  Space,
  Tag,
  Pagination,
  Image,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { Link } from "react-router-dom";
import { removeFoodItem } from "../../../redux/slice/FoodSlice";
import DataTable from "../../../components/admin/Form&Table/Table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type Props = {};

const FoodList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { food, errMess } = useAppSelector((state) => state.food); //
  const deleteFood = (data: string | undefined) => {
    dispatch(removeFoodItem(data))
      .unwrap()
      .then(() => {
        message.success({ content: "Xoá thành công", key: "handling" });
      })
      .catch(() => {
        message.error({ content: { errMess } });
      });
  };
  const columnUserList: any = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_: any, record: any) => <p>{record?.name}</p>,
      width: "200px",
    },

    {
      title: "Price",
      dataIndex: "price",
      render: (_: any, record: any) => <p>{record?.price}</p>,
      width: "200px",
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (_: any, record: any) => <p>{record?.status}</p>,
      width: "200px",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      render: (_: any, record: any) => <p>{record?.stock}</p>,
    },
    {
      title: "Size",
      dataIndex: "size",
      render: (_: any, record: any) => <p>{record?.size}</p>,
    },

    {
      title: "ACTION",
      key: "action",
      fixed: "right",
      width: "100px",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link to={`${record._id}`}>
            <EditOutlined
              style={{ color: "var(--primary)", fontSize: "18px" }}
            />
          </Link>
          <Popconfirm
            title={`Delete ${record?.name ?? record?._id}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => deleteFood(record?._id)}
          >
            <DeleteOutlined style={{ color: "red", fontSize: "18px" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: Props[] = food?.map((item: any, index: any) => {
    return {
      key: index + 1,
      _id: item?._id,
      name: item?.name,
      price: item?.price,
      stock: item?.stock,
      size: item?.size,
      status: item?.status,
    };
  });
 console.log(data);
 
  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/admin/food/create">Create Food</Link>
      </Button>
      <DataTable
        column={columnUserList}
        data={data}
        scrollWidth={{ x: 2000 }}
      />
    </div>
  );
};

export default FoodList;
