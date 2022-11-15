import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../../config";
import { Form, Input, message, notification } from "antd";
import { useAppDispatch } from "../../../redux/hook";
import { authAsyncRegister } from "../../../redux/slice/AuthSlice";
type Props = {};

const SignUp = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.title = "Đăng Ký";
  }, []);

  const onFinish = async (values: any) => {
    const { meta, payload } = await dispatch((authAsyncRegister(values)));
    if (meta.requestStatus == "fulfilled") {
      notification.info({
        message: 'Đăng ký thành công',
        description:
          `Chào ${payload?.username}, vui lòng vào email để xác nhận tài khoản!`,
      });
      setTimeout(() => {
        form.resetFields()
      }, 2000);
    } else {
      notification.error({
        message: 'Đăng ký thất bại',
        description:
          ` ${payload}`,
      });
    }
  };

  return (
    <div className="auth_container">
      <div className="auth_container--title">
        <h1 className="text-[32px] font-bold">Đăng Ký</h1>
      </div>
      <div className="auth_container--content">
        <Form
          autoComplete="off"
          layout="vertical"
          name="signin"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <button className="auth_button">Save</button>
          </Form.Item>
        </Form>
      </div>
      <div className="flex justify-between">
        <div className="">
          <Link to="#">Quên mật khẩu ?</Link>
        </div>
        <div className="">
          <span>Đã có tài khoản</span>
          <Link
            to={config.routes.signin}
            className="text-bold pl-1 hover:text-red-600"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
