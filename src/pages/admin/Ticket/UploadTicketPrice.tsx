import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { updateTiketPrice } from "../../../redux/slice/ticketPriceSlice";

type Props = {};

const UploadTicketPrice = (props: Props) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { ticketPrice, isErr, isFetching, isSucess } = useAppSelector(
    (state) => state.ticketPriceReducer
  );
  const data = ticketPrice?.find((data) => data._id === id);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, [data]);

  const onFinish = async (data: any) => {
    data._id = id;
    dispatch(updateTiketPrice(data))
      .unwrap()
      .then(() => {
        message.success({ content: "Sửa thành công" });
        navigate(configRoute.routes.adminTicketPrice);
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UploadTicketPrice;
