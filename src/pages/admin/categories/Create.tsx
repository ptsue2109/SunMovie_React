import React from "react";
import { Button, Form, Input, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hook";
import { createCategories } from "../../../redux/slice/CategorySlice";
import configRoute from "../../../config";

type Props = {};

const CreateCategory = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onFinish = async (values: any) => {
    const { meta } = await dispatch(createCategories(values));
    if (meta.requestStatus == "fulfilled") {
      message.success({ content: "Thêm thành công hùng đẹp trai" });
      navigate(configRoute.routes.adminCategories);
    } else {
      message.error({ content: "Lỗi" });
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
          name="title"
          label="Name"
          rules={[
            { required: true, message: "Không được để trống hùng đẹp trai! " },
          ]}
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

export default CreateCategory;
