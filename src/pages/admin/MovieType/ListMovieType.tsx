import { Button, message, Popconfirm, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../components/admin/Form&Table/Table";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { removeMovieTypeItem } from "../../../redux/slice/movieTypeSlice";
import swal from "sweetalert";
type Props = {};

const ListMovieType = (props: Props) => {
  const dispatch = useAppDispatch();
  const { movieType, isErr, isFetching, isSucess } = useAppSelector(
    (state) => state.movieTypeReducer
  );
  const deleteUser = (id: any) => {
    swal({
      title: "Bạn có muốn xóa không?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(removeMovieTypeItem(id))
          .unwrap()
          .then(() => {
            swal("Xóa thành công", {
              icon: "success",
            });
          })
          .catch((err: any) => swal("Lỗi", `${err}`, "error"));
      }
    });
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
      height: "10",
      render: (_: any, item: any) => (
        <Space size="middle">
          <Link to={`${item._id}`}>
            <EditOutlined
              style={{ color: "var(--primary)", fontSize: "18px" }}
            />
          </Link>
          <DeleteOutlined
            onClick={() => deleteUser(item?._id)}
            style={{ color: "red", fontSize: "18px" }}
          />
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
