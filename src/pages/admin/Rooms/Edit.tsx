import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { updateRoom } from "../../../redux/slice/roomSlice";
import RoomForm from '../../../components/admin/Form&Table/RoomForm';
import config from "../../../config";
import { getOneSBSTById } from "../../../redux/slice/SeatBySTSlice";

type Props = {}

const AdminRoomEdit = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { rooms } = useAppSelector((state:any) => state.roomReducer);
  const dataSelected = rooms.find((item:any) => item._id === id);
  const [seatFile, setSeatFile] = useState();
  const [rowFile, setRowFile] = useState<any>(dataSelected?.rows);
  const [colFile, setSColFile] = useState<any>(dataSelected?.columns);
  const [blockSeat, setBlockSeat] = useState(dataSelected?.seatBlock)
  const [seats, setSeats] = useState<any>([])
  const [showSeatTye, setShowSeatTye] = useState(false)
  const [adminRenderSeat, setAdminRenderSeat] = useState(false)

  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(getOneSBSTById(id));
      setSeats(payload)
    })();

  }, [id]);

  useEffect(() => {
    document.title = `Admin | Edit ${dataSelected?.name ?? dataSelected?._id}`;
    console.log(dataSelected);
    if (dataSelected) {
      form.setFieldsValue({
        ...dataSelected
      });
    }
  }, [dataSelected]);


  const onFinish = (data: any) => {
    data.seats = seatFile;
    data._id = id;
    data.seatBlock = blockSeat;
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
        edit={true}
        rowFile={rowFile}
        colFile={colFile}
        setRowFile={setRowFile}
        setColFile={setSColFile}
        blockSeat={blockSeat}
        setBlockSeat={setBlockSeat}
        seats={seats}
        setSeats={setSeats}
        showSeatTye={showSeatTye}
        adminRenderSeat= {adminRenderSeat}
      />
    </div>
  )
}

export default AdminRoomEdit