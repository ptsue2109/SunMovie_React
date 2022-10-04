import { Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../../config";
import { useAppDispatch } from "../../../redux/hook";
import { authAsyncLogin } from "../../../redux/slice/AuthSlice";


type Props = {};
const SignIn = (props: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async(values: any) => {
    document.title= "SignIn"
    const { meta, payload } = await dispatch(authAsyncLogin(values));
      if (meta.requestStatus == "fulfilled") {
        message.success('Login success, wait...');
        setTimeout(() => {
          navigate(config.routes.home)
        }, 2000);
      } else {
        message.error(`${payload}`);
      }
  };

  return (
    <div className="auth_container">
      <div className="auth_container--title">
        <h1 className="text-[32px] font-bold">Đăng Nhập</h1>
      </div>
      <div className="auth_container--content">
        <Form
          autoComplete="off"
          layout="vertical"
          name="signin"
          onFinish={onFinish}
          form={form}
        >
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
          <span>Chưa có tài khoản</span>
          <Link
            to={config.routes.signup}
            className="text-bold pl-1 hover:text-red-600"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
