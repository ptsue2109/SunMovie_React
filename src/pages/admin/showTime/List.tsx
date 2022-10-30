import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { message, Popconfirm, Table, Tag, Tooltip } from 'antd';
import { Space, Button } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../../ultils'
import configRoute from '../../../config';
import DataTable from '../../../components/admin/Form&Table/Table';
import { getAlSt, removeData } from '../../../redux/slice/ShowTimeSlice'
type Props = {}

const AdminShowTimeList = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = "Admin | Show"
    dispatch(getAlSt())
  }, [dispatch]);

  const { stList, errorMessage } = useAppSelector((state: any) => state.ShowTimeReducer);

  const deleteData = (val: any) => {
    dispatch(removeData(val)).unwrap()
      .then(() => { message.success('Xóa thành công') })
      .catch(() => message.error(errorMessage))
  };

  const columns = [
    {
      title: 'Ngày ', dataIndex: 'date', key: 'date', render: (_: any, { _id, date }: any) => (
        <Link to={`${_id}`}>{date} </Link>)
    },
    {
      title: 'MovieName', dataIndex: 'name', key: 'name', render: (_: any, { name }: any) => (
        <>
          {name && name?.map((item: any, index: any) => (
            <div className="grid p-1" key={index} >
              <Tag style={{ width: '100%' }}>{item}</Tag>
            </div>
          ))}
        </>

      )
    },
    {
      title: 'Phòng ', dataIndex: 'room', key: 'room', render: (_: any, { room }: any) => (
        <>
          {room && room?.map((item: any, index: any) => (
            <div className='grid p-1' key={index} >
              <Tag style={{ width: '100%' }}>{item}</Tag>
            </div>
          ))}
        </>
      )
    },
    { title: 'Format ', dataIndex: 'format', key: 'format' },
    { title: 'StartAt ', dataIndex: 'startAt', key: 'startAt' },
    { title: 'EndtAt ', dataIndex: 'endAt', key: 'endAt' },
    {
      title: 'status ', dataIndex: 'status', key: 'status', render: (_: any, { status }: any) => (
        status === 0 ? (<><p>Active</p></>) : (<>Inactive</>)
      )
    },
    { title: 'Giá vé tạm tính ', dataIndex: 'extraPrice', key: 'extraPrice' },
    {
      title: "ACTION",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa ">
            <Link to={`${record._id}`}>
              <EditOutlined style={{ color: 'var(--primary)', fontSize: '18px' }} />
            </Link>
          </Tooltip>
          <Tooltip title="Xóa" >
            <Popconfirm
              title={`Xem ${record?.username ?? record?._id}?`}
              okText="OK"
              cancelText="Cancel"
              onConfirm={() => deleteData(record?._id)}
            >
              <DeleteOutlined style={{ color: 'red', fontSize: '18px' }} />
            </Popconfirm>
          </Tooltip>
          <Tooltip title="Xem tổng quan ghế">
            <Link to={`${record._id}`}>
              <EyeOutlined style={{ color: 'var(--primary)', fontSize: '18px' }} />
            </Link>
          </Tooltip>
        </Space>
      ),

    },
  ];

  const data: Props[] = stList?.map((item: any, index: any) => {
    let temPrice = 40000 + item?.extraPrice; //default tisiscket + extra
    var roomName = item?.roomId?.map((item: any) => item?.name)
    var movieNam = item?.movieId?.map((item: any) => item?.name)
    return {
      key: index + 1,
      _id: item?._id,
      name: movieNam,
      date: formatDate(item?.date),
      room: roomName,
      format: item?.filmFormatId?.name,
      startAt: item?.startAt,
      endAt: item?.endAt,
      status: item?.status,
      extraPrice: formatCurrency(temPrice)
    }
  });

  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={configRoute.routes.AdminShowTimesCreate} style={{ color: '#ffff' }}>Create ShowTime</Link>
      </Button>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default AdminShowTimeList