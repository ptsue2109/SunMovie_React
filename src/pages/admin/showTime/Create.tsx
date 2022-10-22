import React, { useState } from 'react'
import ShowTimeForm from '../../../components/admin/Form&Table/ShowTimeForm';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { createData } from '../../../redux/slice/ShowTimeSlice'
import { Button, Form, message } from 'antd'
import moment from 'moment';
import config from '../../../config';
import { Link, useNavigate } from 'react-router-dom';
import configRoute from '../../../config';
type Props = {}

const AdminShowTimesCreate = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const { errorMessage } = useAppSelector(state => state.ShowTimeSlice)
  const dateFormat = 'YYYY-MM-DD';
  const timeFormat = 'YYYY-MM-DD HH:mm:ss';
  const [form] = Form.useForm();
  const [stDate, setStDate] = useState<any>()
  const [startAt, setStartAt] = useState<any>()
  const [endAt, setEndAt] = useState<any>()
  const [extraPrice, setExtraprice] = useState()

  const onFinish = (val: any) => {
    console.log(val);
    
    val.date = moment(stDate).format(dateFormat)
    val.startAt = moment(startAt).format(timeFormat)
    val.endAt = moment(endAt).format(timeFormat);
    dispatch(createData(val)).unwrap()
      .then(() => { message.success('Tạo thành công'); navigate(config.routes.AdminShowTimes) })
      .catch(() => message.error(errorMessage))
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
    <div>

      <Button type="primary" style={{ marginBottom: "20px" }}> <Link to={config.routes.AdminShowTimes} style={{color: '#ffff'}}>List ShowTime</Link> </Button>
      <ShowTimeForm form={form}
        onFinish={onFinish}
        edit={true}
        onReset={onReset}
        stDate={stDate}
        setStDate={setStDate}
        startAt={startAt}
        setStartAt={setStartAt}
        endAt={endAt}
        setEndAt={setEndAt}
        extraPrice={extraPrice}
        setExtraprice={setExtraprice}
      />

    </div>
  )
}

export default AdminShowTimesCreate