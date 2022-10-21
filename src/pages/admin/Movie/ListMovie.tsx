import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Tag, Pagination } from "antd";
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { Link } from "react-router-dom";
import { removeMovieItem } from '../../../redux/slice/Movie';
import DataTable from "../../../components/admin/Form&Table/Table"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
type Props = {}

const ListMovie = (props: Props) => {
  const dispatch = useAppDispatch();
  const { movie ,errMess} = useAppSelector((state) => state.movie);
  const deleteUser = (data: string | undefined) => {
    dispatch(removeMovieItem(data)).unwrap()
      .then(() => {
        message.success({ content: "Xoá thành công", key: "handling" });
      })
      .catch(() => {
        message.error({ content: { errMess } })
      })
  };
  const columnUserList: any = [
    {
      title: "Name",
      dataIndex: "name",
      // key: "image",
      render: (_: any, record: any) => (
        <p>{record?.name}</p>
      ),
    },

    {
      title: "RunTime",
      dataIndex: "runTime",
      render: (_: any, record: any) => (
        <p>{record?.runTime}</p>
      ),
    },

    {
      title: "AgeLimit",
      key: "ageLimit",
      render: (_: any, record: any) => (
        <div >
           <p>{record?.ageLimit}</p>
        </div>
      ),

    },

    {
      title: "language",
      key: "language",
      render: (_: any, record: any) => (
        <div>
           <p>{record?.language}</p>
        </div>
      )
    },

    {
      title: "country",
      key: "country",
      render: (_: any, record: any) => (
        <div>
           <p>{record?.country}</p>
        </div>
      )
    },

    {
      title: "actor",
      key: "actor",
      render: (_: any, record: any) => (
        <div>
           <p>{record?.actor}</p>
        </div>
      )
    },

    {
      title: "actor",
      key: "actor",
      render: (_: any, record: any) => (
        <div>
           <p>{record?.actor}</p>
        </div>
      )
    },

    {
      title: "director",
      key: "director",
      render: (_: any, record: any) => (
        <div>
           <p>{record?.director}</p>
        </div>
      )
    },

    // {
    //   title: "description",
    //   key: "description",
    //   render: (_: any, record: any) => (
    //     <div>
    //        <p>{record?.description}</p>
    //     </div>
    //   )
    // },

    // {
    //   title: "status",
    //   key: "status",
    //   render: (_: any, record: any) => (
    //     <div>
    //        <p>{record?.status}</p>
    //     </div>
    //   )
    // },

    // {
    //   title: "isDelete",
    //   key: "isDelete",
    //   render: (_: any, record: any) => (
    //     <div>
    //        <p>{record?.isDelete}</p>
    //     </div>
    //   )
    // },
    
    {
      title: "ACTION",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link to={`${record._id}`}>
            <EditOutlined style={{ color: 'var(--primary)', fontSize: '18px' }} />
          </Link>
          <Popconfirm
            title={`Delete ${record?.name ?? record?._id}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => deleteUser(record?._id)}
          >
            <DeleteOutlined style={{ color: 'red', fontSize: '18px' }} />
          </Popconfirm>
        </Space>
      ),
     
    },
  ];

  const data: Props[] = movie?.map((item: any, index: any) => {
    console.log(movie)
    return {
      key: index + 1,
      _id: item?._id,
      name: item?.name,
      actor: item?.actor,
      runTime: item?.runTime,
      ageLimit: item?.ageLimit,
      language: item?.language,
      country: item?.country,
      director: item?.director,
      description: item?.description,
      status: item?.status
    }
  });


  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/admin/movies/create">Create Movies</Link>
      </Button>
      <DataTable column={columnUserList} data={data}  />

    </div>
  )
}

export default ListMovie