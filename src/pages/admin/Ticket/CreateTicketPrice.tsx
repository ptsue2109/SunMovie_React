import React from "react";
import { Button, Form, Input, message, Space } from "antd";
import configRoute from "../../../config";
import { useAppDispatch } from "../../../redux/hook";
import { createTicketPrice } from "../../../redux/slice/ticketPriceSlice";
import { useNavigate } from "react-router-dom";

type Props = {};

const CreateTicketPrice = (props: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const { meta, payload } = await dispatch(createTicketPrice(values));
    if (meta.requestStatus == "fulfilled") {
      message.success("Thêm thành  Thành  công");
      navigate(configRoute.routes.adminTicketPrice);
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
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>{" "}
        <Form.Item
          name="price"
          label="Price"
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

export default CreateTicketPrice;
