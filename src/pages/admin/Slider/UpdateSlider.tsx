import { Button, DatePicker, Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { UpdateSliderThunk } from "../../../redux/slice/Slider";
import moment from "moment";
import ImageUpload from "../../../components/upload";
import { UpdateSliders } from "../../../redux/slice/Slider";

type Props = {};

const UpdateSlider = (props: Props) => {
  const [image, setImage] = useState<any[]>([]);
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { slider, errMess } = useAppSelector((state) => state.slider);
  const data = slider.find((item: any) => item._id === id);
  
  useEffect(() => {
    if (data) {
      setImage(data?.image);
      form.setFieldsValue({
        ...data,
        releaseDate: moment(data.releaseDate),
      });
    }
  }, [data]);

  const onFinish = async (values: any) => {
    values._id = id;
    values.releaseDate = new Date(moment(values.releaseDate).format());
    let imageOld = values.avatarList?.fileList;
    if (imageOld) values.image = imageOld;
    else values.image = values?.image;
    delete values?.imageOld;
    dispatch(UpdateSliders(values))
      .unwrap()
      .then(() => {
        message.success({ content: "Sửa thành công" });
        navigate(configRoute.routes.adminMovie);
      })
      .catch(() => {
        message.error({ content: "Thất bại" });
      });
  };
  return (
    <>
    <Button className="mb-3">
      <Link to={configRoute.routes.adminSlider}>DS Slider</Link>
    </Button>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Image">
          <ImageUpload imageList={image} limit={1} key={1} />
        </Form.Item>
        <Form.Item
          name="title"
          label="Tên"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="content"
          label="Nội dung"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Url"
          name="url"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="slug"
          name="slug"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateSlider;
