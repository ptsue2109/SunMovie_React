import { Button, Form, Input } from "antd";
import React from "react";

type Props = {};

const CreateFoodDetail = (props: Props) => {
  return (
    <>
      <Form layout="vertical" autoComplete="off">
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
