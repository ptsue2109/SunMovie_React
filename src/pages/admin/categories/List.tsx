import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { Button, message, Popconfirm, Space } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import configRoute from "../../../config";
import DataTable from "../../../components/admin/Form&Table/Table";
type Props = {};

const ListCategories = (props: Props) => {
  const { categories, isErr, isFetching, isSucess } = useAppSelector(
    (state) => state.categoriesReducer
  );
  const dispatch = useAppDispatch();
  const columnList: any = [
    {
      title: "Name",
      render: (item: any, index: any) => <p>{item.title}</p>,
      height: "10",
    },
    {
      title: "ACTION",
      key: "action",
      height: "10",
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
            onConfirm={() => null}
          >
            <DeleteOutlined style={{ color: "red", fontSize: "18px" }} />
          </Popconfirm>
        </Space>
      ),
      width: 30,
    },
  ];
  const data = categories?.map((item: any) => {
    return {
      _id: item._id,
      title: item.title,
    };
  });
  return (
    <>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={configRoute.routes.adminCategoriesCreate}>Add Category</Link>
      </Button>
      <DataTable column={columnList} data={data} loading={isFetching} />
    </>
  );
};

export default ListCategories;
