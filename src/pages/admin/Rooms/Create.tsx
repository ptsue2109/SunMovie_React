import { Form, Button, message } from "antd";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RoomForm from '../../../components/admin/Form&Table/RoomForm';
import config from '../../../config';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { createRoom } from "../../../redux/slice/RoomSlice"

type Props = {}

const Create = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { errorMessage } = useAppSelector((state) => state.roomReducer);
  React.useEffect(() => {
    document.title = "Admin | Add Rooms";
  }, []);
  const onFinish = () => {

  }
  const onReset = () => {

  }
  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={config.routes.adminRoom}>List rooms</Link>
      </Button>
      <RoomForm
        onFinish={onFinish}
        form={form}
        onReset={onReset}
      />

    </div>
  )
}

export default Create