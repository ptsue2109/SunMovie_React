import { Card, Select, Space, Table, Popconfirm, message } from 'antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import DataTable from "../../../components/admin/Form&Table/Table"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Form, Link } from 'react-router-dom'
import { removeData, updateData } from '../../../redux/slice/FilmFormatSlice';

type Props = {}
const { Option } = Select;
const FilmFormatList = (props: Props) => {
  const { filmFormats, isFetching, errorMessage } = useAppSelector(state => state.FormatReducer);
  const dispatch = useAppDispatch();
  console.log(filmFormats);

  //remove
  const removeFormat = (data: string | undefined) => {
   
    console.log(data)
   dispatch(removeData(data)).unwrap()
   .then(()=> {message.success('Xóa thành công')})
   .catch(() => message.error(errorMessage))
  }


  const columns: any = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.name}
          </Link>
        </div>
      ),

    },
    {
      title: "extraPrice",
      dataIndex: "extraPrice",
      key: "extraPrice"
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
            onConfirm={() => removeFormat(record?._id)}
          >
            <DeleteOutlined style={{ color: 'red', fontSize: '18px' }} />
          </Popconfirm>
        </Space>
      ),
      width: 30
    },
  ];
  const data: Props[] = filmFormats?.map((item: any, index: any) => {
    console.log(filmFormats)
    return {
      key: index + 1,
      _id: item?._id,
      name: item?.name,
      extraPrice: item?.extraPrice
    }
  });

  return (
    <div className='grid  grid-flow-col gap-3'>
      <div className="col-4">
        <Card>
          <DataTable column={columns} data={data} loading={isFetching} />
        </Card>
      </div>
      <div className="col-8">
        <Card>
            {/* <Form >

            </Form> */}
        </Card>
      </div>


    </div>
  )
}

export default FilmFormatList