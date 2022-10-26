import { Button, Form, Input, message, Select } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { createTicketDetail } from "../../../redux/slice/ticketDetailSlice";

type Props = {};

const CreateTicketDetail = (props: Props) => {
  const { tickets } = useAppSelector((state) => state.ticketReducer);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const { meta, payload } = await dispatch(createTicketDetail(values));
    if (meta.requestStatus == "fulfilled") {
      message.success("Thêm thành  Thành  công");
      navigate(configRoute.routes.adminTicketDetail);
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
          name="ticketId"
          label="TicketId"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Select>
            {tickets.map((item) => (
              <Select.Option
                key={item._id}
                value={item.totalPrice}
                rules={[{ required: true, message: "Không được để trống! " }]}
              >
                {item.totalPrice}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>{" "}
        <Form.Item
          name="quantity"
          label="Quantity"
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

export default CreateTicketDetail;
