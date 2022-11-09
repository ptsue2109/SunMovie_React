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
import DataTable from "../../../components/admin/Form&Table/Table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { removeSliderItem } from "../../../redux/slice/Slider";
type Props = {};

const AdminSlider = (props: Props) => {
  const dispatch = useAppDispatch();
  const { slider, errMess } = useAppSelector((state) => state.slider);
  const deleteSlider = (data: string | undefined) => {
    dispatch(removeSliderItem(data))
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
      title: "Image",
      dataIndex: "image",
      fixed: "left",
      // key: "image",
      render: (_: any, record: any) => (
        <img width="150px" src={record?.image} alt="" />
      ),
      width: "200px",
    },
    {
      title: "Title",
      dataIndex: "title",
      // key: "image",
      render: (_: any, record: any) => <p>{record?.title}</p>,
      width: "200px",
    },

    {
      title: "Content",
      dataIndex: "content",
      render: (_: any, record: any) => <p>{record?.content}</p>,
      width: "200px",
    },
    {
      title: "Url",
      dataIndex: "url",
      render: (_: any, record: any) => <p>{record?.url}</p>,
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
            title={`Delete ${record?.title ?? record?._id}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => deleteSlider(record?._id)}
          >
            <DeleteOutlined style={{ color: "red", fontSize: "18px" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: Props[] = slider?.map((item: any, index: any) => {
    return {
      key: index + 1,
      _id: item?._id,
      //image: item?.avatar[0]?.url ?? `${import.meta.env.VITE_HIDDEN_SRC}`,
      title: item?.title,
      content: item?.content,
      url: item?.url,
      
    };
  });

  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/admin/slider/create">Create Slider</Link>
      </Button>
      <DataTable
        column={columnUserList}
        data={data}
        scrollWidth={{ x: 2000 }}
      />
    </div>
  );
};

export default AdminSlider;