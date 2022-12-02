import React from "react";
import { Button, Form, Input, InputNumber, message, Space } from "antd";
import configRoute from "../../../config";
import { useAppDispatch } from "../../../redux/hook";
import { createTicketPrice } from "../../../redux/slice/ticketPriceSlice";
import { Link, useNavigate } from "react-router-dom";

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
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/admin/ticketprice">List TicketPrice</Link>
      </Button>
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
          <InputNumber
            min={10000}
            formatter={(value) =>
              ` ${value}VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            style={{ width: "100%" }}
          />
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
