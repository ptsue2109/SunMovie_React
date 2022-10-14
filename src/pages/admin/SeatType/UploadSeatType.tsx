import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { updateSeatType } from "../../../redux/slice/SeatTypeSlice";

type Props = {};

const UploadSeatType = (props: Props) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { seatType, isErr, isFetching, isSucess } = useAppSelector(
    (state) => state.seatTypeReducer
  );
  const data = seatType?.find((item) => item._id === id);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, [data]);

  const onFinish = async (item: any) => {
    item._id = id;
    dispatch(updateSeatType(item))
      .unwrap()
      .then(() => {
        message.success({ content: "Sửa thành công" });
        navigate(configRoute.routes.adminSeatType);
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
          rules={[
            { required: true, message: "Không được để trống! ", min: 10 },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="extraPrice"
          label="extraPrice"
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

export default UploadSeatType;