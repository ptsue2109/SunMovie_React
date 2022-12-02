import React, { useEffect, useState } from "react";
import {
  Button,
  message,
  Popconfirm,
  Space,
  Tag,
  Pagination,
  Image,
  Select,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { Link } from "react-router-dom";
import { EditFood, removeFoodItem } from "../../../redux/slice/FoodSlice";
import DataTable from "../../../components/admin/Form&Table/Table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UpdateFood from "./UpdateFood";
import { FoodStatsut } from "../../../ultils/data";
import { Option } from "antd/lib/mentions";
type Props = {};

const FoodList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { food, errMess, isFetching } = useAppSelector((state) => state.food); //
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
  const changeStatus = (id: any, value: any) => {
    dispatch(EditFood({ _id: id, status: value }))
      .unwrap()
      .then(() => message.success("Thay đổi trạng thái thành công"));
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
      key: "status",
      dataIndex: "status",
      render: (_: any, { _id, status }: any) => (
        <Select
          value={status === true ? "Còn hàng" : "Hết hang"}
          onChange={(value: any) => {
            changeStatus(_id, value);
          }}
        >
          {FoodStatsut?.map((item: any) => (
            <Option value={item?.value} key={item?.value}>
              {item?.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      render: (_: any, record: any) => <p>{record?.stock}</p>,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      render: (_: any, record: any) => <p>{record?.stock}</p>,
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

  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/admin/food/create">Create Food</Link>
      </Button>
      <DataTable column={columnUserList} data={data} loading={isFetching} />
    </div>
  );
};

export default FoodList;
