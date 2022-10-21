import { Form, Button, message } from "antd";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RoomForm from '../../../components/admin/Form&Table/RoomForm';
import config from '../../../config';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { createRooms } from "../../../redux/slice/roomSlice"

type Props = {}

const AdminRoomCreate = (props: Props) => {
  const [seatFile, setSeatFile] = useState({});
  const [rowFile, setRowFile] = useState(0);
  const [colFile, setSColFile] = useState(0);
  const [blockSeat, setBlockSeat] = useState(0)
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { errorMessage } = useAppSelector((state) => state.userReducer);
  const onFinish = (val: any) => {
    val.seats = seatFile;
    val.seatBlock = blockSeat;
    console.log(val)
    
    dispatch(createRooms(val)).unwrap()
      .then(() => { message.success('tạo thành công'); navigate(config.routes.adminRooms) })
      .catch(() => message.error(`${errorMessage}`))
  }
  useEffect(() => { document.title = "Admin | Create-Room" }, [])
  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={config.routes.adminRooms}>List Rooms</Link>
      </Button>
      <RoomForm
        onFinish={onFinish}
        form={form}
        seatFile={seatFile}
        setSeatFile={setSeatFile}
        rowFile={rowFile}
        colFile={colFile}
        setRowFile={setRowFile}
        setColFile={setSColFile}
        blockSeat={blockSeat}
        setBlockSeat={setBlockSeat}
      />
    </div>
  )
}

export default AdminRoomCreate