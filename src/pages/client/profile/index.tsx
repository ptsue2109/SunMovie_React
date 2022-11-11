import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hook";
import styles from "./profile.module.scss";
import { Table } from "antd";
import InfoUser from "../../../components/client/profile/InfoUser";
type Props = {};

const Profile = (props: Props) => {
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
  }, [currentUser]);

  const columns: any[] = [
    {
      title: "Mã vé",
      dataIndex: "name",
      key: "name",
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: "Tên phim",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Thời gian đặt",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số ghế",
      dataIndex: "address",
      key: "address",
    },
  ];
  const data: any[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
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
            <InfoUser />
          </div>
          {/* change password */}
          <div className={isActive == 2 ? styles.changePass : "hidden"}>
            pass
          </div>
          {/* history */}
          <div className={isActive == 3 ? styles.history : "hidden"}>
            <Table columns={columns} dataSource={data} />;
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
