import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { updateFoodDetail } from "../../../redux/slice/FoodDetail";

type Props = {};

const UploadFoodDetail = (props: Props) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { foodDetail, isErr, isFetching, isSucess } = useAppSelector(
    (state) => state.foodDetailReducer
  );
  const data = foodDetail?.find((item) => item._id === id);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, [data]);

  const onFinish = async (item: any) => {
    item._id = id;
    dispatch(updateFoodDetail(item))
      .unwrap()
      .then(() => {
        message.success({ content: "Sửa thành công" });
        navigate(configRoute.routes.AdminFoodDetail);
      })
      .catch(() => {
        message.error({ content: "Thất bại" });
      });
  };
  return (
    <>
      <Form layout="vertical" form={form} onFinish={onFinish}>
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

export default UploadFoodDetail;
