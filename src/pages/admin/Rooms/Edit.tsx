import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { updateRoom } from "../../../redux/slice/roomSlice";
import RoomForm from '../../../components/admin/Form&Table/RoomForm';
import config from "../../../config";
import { screenData } from "../../../ultils/data"
type Props = {}

const AdminRoomEdit = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { rooms } = useAppSelector((state) => state.roomReducer);
  const dataSelected = rooms.find((item) => item._id === id);
  const [seatFile, setSeatFile] = useState(dataSelected?.seats);
  const [rowFile, setRowFile] = useState(dataSelected?.rows);
  const [colFile, setSColFile] = useState(dataSelected?.columns);

  useEffect(() => {
    document.title = `Admin | Edit ${dataSelected?.name ?? dataSelected?._id}`;
    if (dataSelected) {
      
      form.setFieldsValue({
        ...dataSelected,
      });
    }
  }, [dataSelected]);


  const onFinish = (data: any) => {
    data.seats = seatFile;
    data._id = id
    console.log('data', data);
    dispatch(updateRoom(data)).unwrap()
      .then(() => { message.success('Update thành công'); navigate(config.routes.adminRooms) })
      .catch(() => message.error('Update thất bại'))
  };
  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/admin/rooms">List rooms</Link>
      </Button>
      <RoomForm
        onFinish={onFinish}
        form={form}
        seatFile={seatFile}
        setSeatFile={setSeatFile}
        screen={screenData}
        edit={true}
        rowFile={rowFile}
        colFile={colFile}
        setRowFile={setRowFile}
        setColFile={setSColFile} />
    </div>
  )
}

export default AdminRoomEdit