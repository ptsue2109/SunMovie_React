import React from "react";
import { Form, Button, message, Input, DatePicker, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { config } from "dotenv";
import { createTicket } from "../../../redux/slice/ticketSlice";
import UserForm from "../../../components/admin/Form&Table/UserForm";
import configRoute from "../../../config";
import { validateMessages } from "../../../ultils/FormMessage";
type Props = {};

const CreateTicket = (props: Props) => {
  const { stList, errorMessage } = useAppSelector(
    (state) => state.ShowTimeSlice
  );
  const { ticketPrice } = useAppSelector((state) => state.ticketPriceReducer);
  const { users } = useAppSelector((state) => state.userReducer);
  console.log(users);

  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const { meta, payload } = await dispatch(createTicket(values));
    if (meta.requestStatus == "fulfilled") {
      message.success("Thêm thành công");
      navigate(configRoute.routes.adminListTicket);
    } else {
      message.error(`${payload}`);
    }
  };
  const status = [
    { id: 1, value: true, name: "Active" },
    { id: 2, value: false, name: "Inactive" },
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
          <DatePicker name="totalPrice" />
        </Form.Item>

        <Form.Item
          name="totalPrice"
          label="totalPrice"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="showtimeId"
          name="showtimeId"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Select>
            {stList.map((item) => (
              <Select.Option
                key={item._id}
                value={item.date}
                rules={[{ required: true, message: "Không được để trống! " }]}
              >
                {item.date}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="seatId"
          label="seatId"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="ticketPriceId"
          name="ticketPriceId"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Select>
            {ticketPrice.map((item) => (
              <Select.Option key={item._id} value={item.price}>
                {item.price}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="userId"
          name="userId"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Select>
            {users.map((item) => (
              <Select.Option key={item._id} value={item.username}>
                {item.username}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select>
            {status.map((item) => (
              <Select.Option key={item.id} value={item.value}>
                {item.name}
              </Select.Option>
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

export default CreateTicket;
