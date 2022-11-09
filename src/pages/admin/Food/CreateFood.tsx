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
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    values.releaseDate = new Date(moment(values.releaseDate).format());
    values.image = values.avatarList?.fileList;
    delete values?.avatarList;
    const { meta, payload } = await dispatch(createFood(values));
    if (meta.requestStatus == "fulfilled") {
      message.success("Thêm thành công");
      navigate(configRoute.routes.adminFood);
    } else {
      message.error(`${payload}`);
    }
  };
  const config = {
    rules: [
      {
        type: "object" as const,
        required: true,
        message: "Please select time!",
      },
    ],
  };
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >

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

        <Form.Item
          name="size"
          label="Size"
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