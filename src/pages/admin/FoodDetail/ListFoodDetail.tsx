import { Button, message, Popconfirm, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../components/admin/Form&Table/Table";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { removeFoodDetail } from "../../../redux/slice/FoodDetail";
type Props = {};

const ListFoodDetail = (props: Props) => {
  const dispatch = useAppDispatch();
  const { foodDetail, isErr, isFetching, isSucess } = useAppSelector(
    (state) => state.foodDetailReducer
  );
  const deleteFoodDetail = (id: any) => {
    dispatch(removeFoodDetail(id))
      .then(() => message.success({ content: "Xóa thành công" }))
      .catch(() => message.error({ content: "lỗi" }));
  };
  const columnList: any = [
    {
      title: "total",
      render: (item: any, index: any) => <p>{item.total}</p>,
      height: "10",
    },
    {
      title: "foodId",
      render: (item: any, index: any) => <p>{item.foodId}</p>,
      height: "10",
    },
    {
      title: "ACTION",
      key: "action",
      render: (_: any, item: any) => (
        <Space size="middle">
          <Link to={`${item._id}`}>
            <EditOutlined
              style={{ color: "var(--primary)", fontSize: "18px" }}
            />
          </Link>
          <Popconfirm
            title={`Delete ${item?.foodId ?? item?._id}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => deleteFoodDetail(item?._id)}
          >
            <DeleteOutlined style={{ color: "red", fontSize: "18px" }} />
          </Popconfirm>
        </Space>
      ),
      width: 30,
    },
  ];
  const data = foodDetail?.map((item: any) => {
    return {
      _id: item._id,
      total: item.total,
      foodId: item.foodId,
    };
  });
  return (
    <>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={configRoute.routes.AdminFoodDetailCreate}>
          Add Food Detail
        </Link>
      </Button>
      <DataTable column={columnList} data={data} loading={isFetching} />
    </>
  );
};

export default ListFoodDetail;
