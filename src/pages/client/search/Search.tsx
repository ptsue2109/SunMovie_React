import React from "react";
import styles from "./Search.module.css";
import { Button, Form, Input } from "antd";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
type Props = {};

const Search = (props: Props) => {
  const [form] = Form.useForm();
  const onFinish = ({ value }: any) => {
    console.log("Success:", value);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className={styles.container}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="value">
            <Input placeholder="Tìm phim theo tên...." bordered={false} />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit">
              <div className={styles.btn}>
                <BiSearch />
              </div>
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.product}>
          <h2>Phim được tìm kiếm với từ khóa "hi"</h2>

          <div className={styles.content_list}>
            <div className={styles.content_list_item}>
              <Link to="{item.slug}">
                <div className={styles.content_list_item_img}>
                  <img
                    src={
                      "https://th.bing.com/th/id/OIP.BU9oJYt8PtDPdsyz-XLNeQHaKe?pid=ImgDet"
                    }
                    alt=""
                  />
                </div>
                <div className={styles.content_list_item_info}>
                  <h3>{"Tên phim"}</h3>
                  <p>Thể loại: Kinh dị</p>
                  <p>Khởi chiếu: {"formatDate(item.releaseDate)"}</p>
                  <button>Đặt vé</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
