import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hook";
import styles from "./profile.module.scss";
import { Button, Form, Input, InputNumber, Radio } from "antd";
type Props = {};

const Profile = (props: Props) => {
  const [value, setValue] = useState(1);
  const { currentUser, isLogged } = useAppSelector(
    (state) => state.authReducer
  );
  const [isActive, setActive] = useState(1);
  const isToggle = (number: number) => {
    setActive(number);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogged == false) {
      return navigate("/");
    }
    console.log(currentUser);
  }, [currentUser]);

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.bg}>
            <img
              src="https://res.cloudinary.com/hungtv/image/upload/v1665649901/banner_profile_ppie5s.jpg"
              alt=""
            />
          </div>
          <div className={styles.avatar}>
            <img src="https://th.bing.com/th/id/R.71c4453ad27286d6fd431c271f737cf7?rik=kKxKeEyNDatElA&pid=ImgRaw&r=0&sres=1&sresct=1" />
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.btn}>
            <button
              onClick={() => isToggle(1)}
              className={isActive == 1 ? styles.btn_active : ""}
            >
              Thông tin cá nhân
            </button>
            <button
              onClick={() => isToggle(2)}
              className={isActive == 2 ? styles.btn_active : ""}
            >
              Đổi mật khẩu
            </button>
            <button
              onClick={() => isToggle(3)}
              className={isActive == 3 ? styles.btn_active : ""}
            >
              Lịch sử đặt vé
            </button>
          </div>
          {/* infomation */}
          <div className={isActive == 1 ? styles.info : "hidden"}>
            <Form {...layout} name="nest-messages" onFinish={onFinish}>
              <Form.Item
                name="email"
                label={
                  <label style={{ color: "white", fontSize: "18px" }}>
                    Email
                  </label>
                }
              >
                <Input
                  readOnly
                  style={{
                    cursor: "context-menu",
                    height: "40px",
                  }}
                />
              </Form.Item>
              <Form.Item
                name="username"
                label={
                  <label style={{ color: "white", fontSize: "18px" }}>
                    Tên
                  </label>
                }
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Input
                  style={{
                    height: "40px",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label={
                  <label style={{ color: "white", fontSize: "18px" }}>
                    Số điện thoại
                  </label>
                }
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Input
                  style={{
                    height: "40px",
                  }}
                />
              </Form.Item>
              <Form.Item
                label={
                  <label style={{ color: "white", fontSize: "18px" }}>
                    Giới tính
                  </label>
                }
                name="gender"
              >
                <Radio.Group value={value}>
                  <Radio value={0} style={{ color: "white", fontSize: "18px" }}>
                    Nam
                  </Radio>
                  <Radio value={1} style={{ color: "white", fontSize: "18px" }}>
                    Nữ
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <div>
                <div>Khách hàng</div>
                <div>Trạng thái: Đã kích hoạt</div>
                <div>
                  <span>Ngày đăng ký: 29/05/2021 19:30:30</span>-
                  <span> Ngày sửa gần nhất: 29/05/2021 19:30:30</span>
                </div>
              </div>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    margin: "20px 0",
                    width: "150px",
                    height: "50px",
                    backgroundColor: "#151f32",
                  }}
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
          {/* change password */}
          <div className={isActive == 2 ? styles.changePass : "hidden"}>
            pass
          </div>
          {/* history */}
          <div className={isActive == 3 ? styles.history : "hidden"}>
            lịch sử
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
