import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, message, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import moment from "moment";
import ImageUpload from "../../../components/upload";
import { createSlider } from "../../../redux/slice/Slider";
type Props = {};

const CreateSlider = (props: Props) => {
  const [image, setImage] = useState<any[]>([]);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    values.releaseDate = new Date(moment(values.releaseDate).format());
    values.images = values.avatarList?.fileList;
    delete values?.avatarList;
    const { meta, payload } = await dispatch(createSlider(values));
    if (meta.requestStatus == "fulfilled") {
      message.success("Thêm thành công");
      navigate(configRoute.routes.adminSlider);
    } else {
      message.error(`${payload}`);
    }
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Ảnh">
          <ImageUpload imageList={image} limit={1} key={1} />
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Nội dung"
          label="Content"
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateSlider;
