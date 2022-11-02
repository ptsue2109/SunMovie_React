import { Button, Card, Form, Skeleton, Tag, Typography, Collapse, Descriptions, Select, Space, Input, message, Table } from 'antd';
import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { getAlSt } from '../../../redux/slice/ShowTimeSlice';
import { getAllSBST } from '../../../redux/slice/SeatBySTSlice';
import config from "../../../config";
import { CaretRightOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { validateMessages } from '../../../ultils/FormMessage';
import { formatTime, formatDateString, formatCurrency } from "../../../ultils";
import { createData } from '../../../redux/slice/SeatBySTSlice';

type Props = {}
const { Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;

const ShowTimeSeat = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => { dispatch(getAlSt()) }, []);
  useEffect(() => { dispatch(getAllSBST()) }, []);
  const { stList } = useAppSelector((state) => state.ShowTimeReducer);
  const { seatsByST } = useAppSelector((state) => state.SeatBySTReducer);

  console.log('seatsByST', seatsByST);

  const { id } = useParams();
  const dataSelected = stList.find((item: any) => item._id === id);
  const newSeatByST = seatsByST.filter((item: any) => item?.showTimeId._id === id)
  console.log('news', newSeatByST);

  const [form] = Form.useForm()
  const onFinish = (val: any) => {
    val.showTimeId = id
    console.log('val', val);
    dispatch(createData(val)).unwrap()
      .then(() => { message.success('Tạo ghế thành công') })
      .catch(() => message.error("Tạo thất bại"))
  }
  const onReset = () => {
    form.resetFields()
  }

  const handleChange = () => {
    form.setFieldsValue({});
  };

  return (
    <div>
      <Button className="mb-5">
        <Link to={config.routes.AdminShowTimes}>Xem giờ chiếu</Link>
      </Button>
      <Collapse bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        className="site-collapse-custom-collapse">
        <Panel header="Thông tin tổng quan" key="1">
          {dataSelected ? (
            <>
              <Descriptions title=" Tổng quan">
                <Descriptions.Item label="Phim đã chọn">
                  {dataSelected.movieId.map((item: any) => (
                    <Tag key={item?._id}> {item?.name}</Tag>
                  ))}
                </Descriptions.Item>
                <Descriptions.Item label="Rạp đã chọn">
                  {dataSelected.roomId.map((item: any) => (
                    <Tag key={item?._id}> {item?.name}</Tag>
                  ))}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày chiếu">
                  <Text> {formatDateString(dataSelected?.date)}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Thời gian chiếu">
                  <Text> {formatTime(dataSelected?.startAt)} - {formatTime(dataSelected?.endAt)}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Format film">
                  <Text> {dataSelected?.filmFormatId?.name}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Extra price">
                  <Text> {formatCurrency(dataSelected.extraPrice)}</Text>
                </Descriptions.Item>

              </Descriptions>
            </>
          ) : (<>
            <Text > Lỗi hệ thống</Text>
          </>)}
        </Panel>
        <Panel header="Xếp phòng" key="2">
          <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Form.Item label="Chọn phim" name="movieId" rules={[{ required: true }]}>
              <Select>
                {dataSelected?.movieId && dataSelected?.movieId?.map((item: any) => (
                  <Select.Option value={item._id} key={item._id} >{item.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Chọn phòng" name="roomId" rules={[{ required: true }]}>
              <Select mode='multiple'>
                {dataSelected?.roomId && dataSelected?.roomId?.map((item: any) => (
                  <Select.Option value={item._id} key={item._id} >{item.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tạo ghế
              </Button>
            </Form.Item>
          </Form>
        </Panel>
        <Panel header="Xem kết quả " key="3">
           length:  {newSeatByST?.length}
           {newSeatByST && newSeatByST?.map((item:any) => (
            <Card key={item?._id}>
              <p>ID : {item?._id} </p>
              <p>Tên phòng :</p>
              <p>Tên phim :</p>
              <Link to={""}>Chi tiết ghế </Link>
            </Card>
           ))}
        </Panel>
      </Collapse>

    </div>
  )
}

export default ShowTimeSeat