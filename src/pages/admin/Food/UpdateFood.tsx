import { Button, DatePicker, Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { EditFood } from "../../../redux/slice/FoodSlice";
import moment from "moment";


type Props = {};

const UpdateFood = (props: Props) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { food, errMess } = useAppSelector((state) => state.food); //
  const data = food.find((item: any) => item._id === id);
  useEffect(() => {
    if (data) {
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
    dispatch(EditFood(values))
      .unwrap()
      .then(() => {
        message.success({ content: "Sửa thành công" });
        navigate(configRoute.routes.adminFood);
      })
      .catch(() => {
        message.error({ content: "Thất bại" });
      });
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

export default UpdateFood;
