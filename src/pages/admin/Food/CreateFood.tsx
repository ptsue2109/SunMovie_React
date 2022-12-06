import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, message, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { createFood } from "../../../redux/slice/FoodSlice";
import { useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import moment from "moment";
import ImageUpload from "../../../components/upload";
type Props = {};

const CreateFood = (props: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [avatarList, setAvatarList] = useState<any>([])
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    values.image = values.avatarList?.fileList[0]?.url;

    const { meta, payload } = await dispatch(createFood(values));
    if (meta.requestStatus == "fulfilled") {
      message.success("Thêm thành công");
      navigate(configRoute.routes.adminFood);
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
        <Form.Item label="Avatar" >
          <ImageUpload imageList={avatarList} limit={1} />
          <small>(Tải lên ít nhất 1 ảnh )</small>
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="stock"
          label="Stock"
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

export default CreateFood;
