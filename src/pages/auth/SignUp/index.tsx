import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../../config";
import { Form, Input, message, notification } from "antd";
import { useAppDispatch } from "../../../redux/hook";
import { authAsyncRegister } from "../../../redux/slice/AuthSlice";
import configRoute from "../../../config";
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
            <Input placeholder='Your name' />
          </Form.Item>
          <Form.Item name="email" label="EMAIL" rules={[{ required: true }, { type: 'email', warningOnly: true }]} >
            <Input placeholder="Enter your email" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' },]} hasFeedback >
            <Input.Password placeholder='Enter password' />
          </Form.Item>

          <Form.Item name="confirm" label="Confirm Password" dependencies={['password']} hasFeedback
            rules={[{ required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) { return Promise.resolve(); }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
            ]}
          >
            <Input.Password placeholder='Confirm password' />
          </Form.Item>
          <Form.Item>
            <button className="auth_button">Save</button>
          </Form.Item>
        </Form>
      </div>
      <div className="flex justify-between">
        <div className="">
          <Link to={configRoute.routes.forgotPass}>Quên mật khẩu ?</Link>
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
