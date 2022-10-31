import { Button, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch } from "../../../redux/hook";
import { createFoodDetail } from "../../../redux/slice/FoodDetail";

type Props = {};

const CreateFoodDetail = (props: Props) => {
  const number = (value: any) =>
    value && isNaN(Number(value)) ? "Dien so vao be a number" : undefined;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const { meta, payload } = await dispatch(createFoodDetail(values));
    if (meta.requestStatus == "fulfilled") {
      message.success("Thêm thành công");
      navigate(configRoute.routes.AdminFoodDetail);
    } else {
      message.error(`${payload}`);
    }
  };
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="total"
          label="total"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input placeholder="Nhập vào Số" />
        </Form.Item>
        <Form.Item
          name="extfoodIdraPrice"
          label="foodId"
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

export default CreateFoodDetail;
