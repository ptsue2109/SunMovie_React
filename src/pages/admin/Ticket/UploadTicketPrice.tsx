import { Button, Form, Input, InputNumber, message } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const data = ticketPrice.find((item) => item._id === id);
  console.log(id, data);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, [data]);

  const onFinish = async (values: any) => {
    values._id = id;

    dispatch(updateTiketPrice(values))
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
        </Form.Item>
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

export default UploadTicketPrice;
