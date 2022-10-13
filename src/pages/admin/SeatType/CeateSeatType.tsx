import { Button, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch } from "../../../redux/hook";
import { createSeatType } from "../../../redux/slice/SeatTypeSlice";

type Props = {};

const CeateSeatType = (props: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const { meta, payload } = await dispatch(createSeatType(values));
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
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Không được để trống! ", min: 10 },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="extraPrice"
          label="ExtraPrice"
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

export default CeateSeatType;
