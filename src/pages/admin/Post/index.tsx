import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import DataTable from "../../../components/admin/Form&Table/Table"
import { Space, Typography, message, Tooltip, Button, Select, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';
import { defaultStatus } from '../../../ultils/data';
import { removeData, updateData } from "../../../redux/slice/PostSlice"
import moment from 'moment';
import { formatDate } from '../../../ultils';
type Props = {}
const { Text } = Typography;
const { Option } = Select;

const AdminPosts = (props: Props) => {
  const { posts, errorMessage } = useAppSelector(state => state.PostSlice);
  const dispatch = useAppDispatch();


  const deleteData = (data: string | undefined) => {
    dispatch(removeData(data)).unwrap()
    .then(() =>  message.success('Xóa thành công'))
    .catch(() => message.error(errorMessage))
  };

  const changeStatus = (id: any, value: any) => {
    dispatch(updateData({ _id: id, status: value })).unwrap().then(() => message.success('Thay đổi trạng thái thành công'))
  }

  const columns: any[] = [
    {
      title: "Thumbnail",
      key: "thumbnail",
      dataIndex: "thumbnail",
      render: (_: any, record: any) => (
        <img width="40px" height="40px" src={record?.thumbnail} alt="" className="object-cover" />
      ),
      width: 50
    },
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
      render: (item: any, record: any) => (
        <Link to={`${record._id}`} target="_blank">
          <Text className="text-[#1890ff]">{item.length >= 30 ? `${item.substring(0, 30)}...` : item}</Text>
        </Link>
      ),
      width: 220
    },
    {
      title: "Desc",
      key: "desc",
      dataIndex: "desc",
      render: (_: any, {desc}: any) => (
        <Text className="text-[#1890ff]">{desc.length >= 30 ? `${desc.substring(0, 30)}...` : desc}</Text>
      ),
      width: 220
    },
    {
      title: "Author",
      key: "author",
      dataIndex: "author",
      render: (_: any, {author}: any) => (
        <Tooltip title={author?.email}>{author?.username}</Tooltip>
      ),
      width: 220
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_: any, { _id, status }: any) => (
        <Select value={status === 0 ? 'active' : 'inActive'}
          onChange={(value: any) => { changeStatus(_id, value) }}>
          {defaultStatus?.map((item: any) => (
            <Option value={item?.value} key={item?.value}>{item?.name}</Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Create At",
      key: "create",
      dataIndex: "create",
      width: 120
    },
    {
      title: "Last Update",
      key: "update",
      dataIndex: "update",
      width: 120
    },
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
            onConfirm={() => deleteData(record?._id)}
          >
            <DeleteOutlined style={{ color: 'red', fontSize: '18px' }} />
          </Popconfirm>
        </Space>
      ),
      width: 30
    },

  ];

  const data: Props[] = posts?.map((item: any, index: any) => {
    console.log(formatDate(item?.createdAt))
    return {
      key: index + 1,
      _id: item?._id,
      title: item?.title,
      thumbnail: item?.imagesFile[0]?.url ?? `${import.meta.env.VITE_HIDDEN_SRC}`,
      author: item?.userId,
      status: item?.status,
      desc: item?.desc,
      create: formatDate(item?.createdAt),
      update: formatDate(item?.updatedAt)
    }
  });

  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="add">Add New Post</Link>
      </Button>
      <DataTable column={columns} data={data} />

    </div>
  )
}

export default AdminPosts
