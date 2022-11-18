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
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item
          name="totalPrice"
          label="totalPrice"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="setByShowTimeId "
          name="setByShowTimeId"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Select>
            {stList.map((item) => (
              <Select.Option
                key={item._id}
                value={item.setByShowTimeId}
                rules={[{ required: true, message: "Không được để trống! " }]}
              >
                {item.setByShowTimeId}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="chosenSeats"
          name="chosenSeats"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
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
