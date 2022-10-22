import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { message, Popconfirm, Tooltip } from 'antd';
import { Space, Button } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../ultils'
import configRoute from '../../../config';
import DataTable from '../../../components/admin/Form&Table/Table';
import { removeData } from '../../../redux/slice/ShowTimeSlice'
type Props = {}

const AdminShowTimeList = (props: Props) => {
  const { stList, errorMessage } = useAppSelector(state => state.ShowTimeSlice);
  const dispatch = useAppDispatch();

  const deleteData = (val: any) => {
    dispatch(removeData(val)).unwrap()
      .then(() => { message.success('Xóa thành công') })
      .catch(() => message.error(errorMessage))
  };


  const columns = [
    { title: 'Ngày ', dataIndex: 'date', key: 'date' },
    { title: 'MovieName', dataIndex: 'name', key: 'name' },
    { title: 'Phòng ', dataIndex: 'room', key: 'room' },
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
    return {
      key: index + 1,
      _id: item?._id,
      name: item?.movieId?.name,
      date: item?.date,
      room: item?.roomId?.name,
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
      <DataTable column={columns} data={data} scrollWidth={550} />
    </div>
  )
}

export default AdminShowTimeList