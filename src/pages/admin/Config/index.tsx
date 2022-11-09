import { Button, message, Popconfirm, Select, Space, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../components/admin/Form&Table/Table";
import configRoute from "../../../config";
import { useAppSelector } from "../../../redux/hook";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
type Props = {};

const WebConfig = (props: Props) => {
  const { loading, webConfigs } = useAppSelector((state: any) => state.WebConfigReducer);
  const quantity = webConfigs?.length

  const confirm = () => {
    message.info('Chỉ có thể update, không cho phép xóa')
  }
  const columns: any[] = [
    {
      title: "Logo",
      key: "logo",
      dataIndex: "logo",
      render: (_: any, record: any) => (
        <img
          width="50px"
          height="50px"
          src={record?.logo}
          alt=""
          className="object-cover"
        />
      ),
      width: 100,
    },
    {
      title: "storeName",
      key: "storeName",
      dataIndex: "storeName",
    },
    {
      title: "address",
      key: "address",
      dataIndex: "address",
    },

    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_: any, record: any) => (
        <Tag color={record.status === false ? "red" : "blue"}>
          {record.status === false ? ` Đang bảo trì` : `Đang hoạt động`}
        </Tag>
      ),
      width: 150,
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
      width: 150
    },
    {
      title: "social",
      key: "social",
      dataIndex: "social"
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
          <Popconfirm
            title={`Delete ${record?.storeName ?? record?._id}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={confirm}
          >
            <DeleteOutlined style={{ color: "red", fontSize: "18px" }} />
          </Popconfirm>
        </Space>
      ),
      width: 130,
    },
  ];

  const data: Props[] = webConfigs?.map((item: any, index: any) => {
    return {
      key: index + 1,
      _id: item?._id,
      logo: item?.logo[0]?.url ?? `${import.meta.env.VITE_HIDDEN_SRC}`,
      phone: item?.phone,
      isMaintaince: item?.isMaintaince,
      address: item?.address[0]?.text,
      storeName: item?.storeName,
      social: (item?.social?.map((item: any) => item?.name)).join('-'),
    };
  });
  return (
    <div>
      <Button className="mb-3" type="primary" disabled={quantity > 0}>
        <Link to={configRoute.routes.webConfigAdd}>Tạo mới</Link>
      </Button>
      <DataTable column={columns} data={data} loading={loading} />
    </div>
  );
};

export default WebConfig;