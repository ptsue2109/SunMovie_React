import React, { useEffect, useState } from 'react'
import ShowTimeForm from '../../../components/admin/Form&Table/ShowTimeForm';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { createData } from '../../../redux/slice/ShowTimeSlice'
import { Button, Form, message } from 'antd'
import moment from 'moment';
import config from '../../../config';
import { Link, useNavigate } from 'react-router-dom';

type Props = {}

const AdminShowTimesCreate = (_props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { errorMessage } = useAppSelector(state => state.ShowTimeReducer)
  const [form] = Form.useForm();
  const [extraPrice, setExtraprice] = useState()
  useEffect(() => { document.title = "Admin | Create - ShowTimes"}, [])

  const onFinish =async ({timeValid, ...values}: any ) => {
    console.log(values);
    console.log(timeValid);
    const [x, y] = timeValid
    values.startAt = new Date(moment(x).format());
    values.endAt = new Date(moment(y).format());
    values.date =  values.startAt

    dispatch(createData(values)).unwrap()
      .then(() => { message.success('Tạo thành công'); navigate(config.routes.AdminShowTimes) })
      .catch(() => message.error(errorMessage))
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
    <div>

      <Button type="primary" style={{ marginBottom: "20px" }}> <Link to={config.routes.AdminShowTimes} style={{ color: '#ffff' }}>List ShowTime</Link> </Button>
      <ShowTimeForm form={form}
        onFinish={onFinish}
        edit={true}
        onReset={onReset}
        extraPrice={extraPrice}
        setExtraprice={setExtraprice}
      />

    </div>
  )
}

export default AdminShowTimesCreate