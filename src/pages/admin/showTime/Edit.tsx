import React, { useEffect, useState } from "react";
import ShowTimeForm from "../../../components/admin/Form&Table/ShowTimeForm";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { createData, getAlSt, updateData } from "../../../redux/slice/ShowTimeSlice";
import { Button, Form, message } from "antd";
import moment from "moment";
import config from "../../../config";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
type Props = {};

const AdminShowTimesEdit = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [extraPrice, setExtraprice] = useState();
  useEffect(() => { 
    (async() => {
      dispatch(getAlSt({}))
    })();
  
  }, []);

  const { stList } = useAppSelector((state:any) => state.ShowTimeReducer);
  const dataSelected = stList?.find((item: any) => item?._id === id);
  let movie = dataSelected?.movieId?.map((item:any) => item?._id);
  let room = dataSelected?.roomId?.map((item:any) => item?._id);

  useEffect(() => {
    document.title = `Admin | ST Edit ${dataSelected?._id}`;
    if (dataSelected) {
      form.setFieldsValue({
        ...dataSelected,
        movieId: movie,
        roomId: room,
        filmFormatId: dataSelected?.filmFormatId?._id,
        timeValid: [moment(dataSelected?.startAt), moment(dataSelected?.endAt)],

      });
    }
  }, [dataSelected]);

  const onReset = () => {
    form.resetFields();
  };
  const onFinish = async ({ timeValid, ...values }: any) => {
    values._id = id;
    const [x, y] = timeValid
    values.startAt = new Date(moment(x).format());
    values.endAt = new Date(moment(y).format());
    values.date =  values.startAt
    dispatch(updateData(values)).unwrap()
      .then(() => { message.success('Cập nhật thành công'); navigate(config.routes.AdminShowTimes) })
      .catch(() => message.error('Lỗi '))
  };
  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={config.routes.AdminShowTimes}>Danh sách giờ chiếu</Link>
      </Button>
      <ShowTimeForm
        form={form}
        onFinish={onFinish}
        edit={true}
        onReset={onReset}
        extraPrice={extraPrice}
        setExtraprice={setExtraprice}
      />
    </div>
  );
};

export default AdminShowTimesEdit;
