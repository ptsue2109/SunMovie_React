import { Button, Form } from 'antd'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SeatForm from '../../../components/admin/Form&Table/SeatForm';
import config from '../../../config';

type Props = {}

const CreatSeats = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();



  useEffect(() => {
    document.title = "Admin | Seats"
  }, []);

  const onFinish = (data: any) => {
    console.log('data', data)
  };

  const onReset = () => {

  };
  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={config.routes.adminUserList}>List seats</Link>
      </Button>

      <SeatForm
       form={form} 
       onFinish={onFinish}
       onReset={onReset}
       />
    </div>
  )
}

export default CreatSeats