import { Button, message, Popconfirm, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../components/admin/Form&Table/Table";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { removeMovieTypeItem } from "../../../redux/slice/movieTypeSlice";
import Swal from "sweetalert2";
type Props = {};

const ListMovieType = (props: Props) => {
  const dispatch = useAppDispatch();
  const { movieType, isErr, isFetching, isSucess } = useAppSelector(
    (state) => state.movieTypeReducer
  );
  const deleteUser = (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(removeMovieTypeItem(id))
          .unwrap()
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Xóa thành công",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err: any) => alert(err));
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
     <div className="flex gap-5">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          <Link to={configRoute.routes.adminMovieTypeAdd}>Add Movie Type</Link>
        </Button>
        <Button>
          <Link to={configRoute.routes.adminMovie}>List Film</Link>
        </Button>
      </div>
      <DataTable column={columnList} data={data} loading={isFetching} />
    </>
  );
};

export default ListMovieType;
