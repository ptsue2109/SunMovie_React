import { Button, DatePicker, Form, Input, message, Select } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserForm from "../../../components/admin/Form&Table/UserForm";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { updateTiket } from "../../../redux/slice/ticketSlice";

type Props = {};

const UploadTicket = (props: Props) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tickets, isErr, isFetching, isSucess } = useAppSelector(
    (state) => state.ticketReducer
  );
  const data = tickets?.find((item) => item._id === id);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, [data]);

  const onFinish = async (data: any) => {
    data._id = id;
    dispatch(updateTiket(data))
      .unwrap()
      .then(() => {
        message.success({ content: "Sửa thành công" });
        navigate(configRoute.routes.adminListTicket);
      })
      .catch(() => {
        message.error({ content: "Thất bại" });
      });
  };
  const status = [
    { value: true, name: "Active" },
    { value: false, name: "Inactive" },
  ];
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="date"
          label="date"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="totalPrice"
          label="totalPrice"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="showtimeId"
          label="showtimeId"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>{" "}
        <Form.Item
          name="seatId"
          label="seatId"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="ticketPriceId"
          label="ticketPriceId"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>{" "}
        <Form.Item
          name="userId"
          label="userId"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>{" "}
        <Form.Item label="Status" name="status">
          <Select>
            {status.map((item) => (
              <Select.Option value={item.value}>{item.name}</Select.Option>
            ))}
          </Select>
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

export default UploadTicket;
