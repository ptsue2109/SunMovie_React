import { Button, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch } from "../../../redux/hook";
import { createFoodDetail } from "../../../redux/slice/FoodDetail";

type Props = {};

const CreateFoodDetail = (props: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const { meta, payload } = await dispatch(createFoodDetail(values));
    if (meta.requestStatus == "fulfilled") {
      message.success("Thêm thành công");
      navigate(configRoute.routes.adminSeatType);
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
          rules={[
            { required: true, message: "Không được để trống! ", min: 10 },
          ]}
        >
          <Input />
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
