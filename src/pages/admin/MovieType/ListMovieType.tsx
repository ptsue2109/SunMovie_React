import { Button, message, Popconfirm, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../components/admin/Form&Table/Table";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { removeMovieTypeItem } from "../../../redux/slice/movieTypeSlice";
type Props = {};

const ListMovieType = (props: Props) => {
  const dispatch = useAppDispatch();
  const { movieType, isErr, isFetching, isSucess } = useAppSelector(
    (state) => state.movieTypeReducer
  );
  const deleteUser = (id: any) => {
    dispatch(removeMovieTypeItem(id))
      .then(() => message.success({ content: "Xóa thành công" }))
      .catch(() => message.error({ content: "lỗi" }));
  };
  const columnList: any = [
    {
      title: "name",
      render: (item: any, index: any) => <p>{item.movieName}</p>,
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
            title={`Delete ${item?.movieName ?? item?._id}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => deleteUser(item?._id)}
          >
            <DeleteOutlined style={{ color: "red", fontSize: "18px" }} />
          </Popconfirm>
        </Space>
      ),
      width: 30,
    },
  ];
  const data = movieType?.map((item: any) => {
    return {
      _id: item._id,
      movieName: item.movieName,
    };
  });
  return (
    <>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={configRoute.routes.adminMovieTypeAdd}>Add Movie Type</Link>
      </Button>
      <DataTable column={columnList} data={data} loading={isFetching} />
    </>
  );
};

export default ListMovieType;
