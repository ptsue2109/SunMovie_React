import {
  Button,
  Form,
  Rate,
  Comment,
  Tooltip,
  Avatar,
  message,
  notification,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { comenteCreate } from "../../../redux/slice/ComenteSlice";
import { formatTime, formatDateString } from "../../../ultils";
import { getOneMovie } from "../../../redux/slice/Movie";

type Props = {
  data: any;
};

const Comente = ({ data }: Props) => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>();
  const [allCmt, setAllCmt] = useState<any[]>([]);
  const { slug } = useParams();
  useEffect(() => {
    if (data) {
      setMovie(data?.movie);
      let commentActive = data?.comment?.filter(
        (item: any) => item?.status === 0
      );
      setAllCmt(commentActive);
    }
  }, [data]);

  const { currentUser } = useAppSelector((state: any) => state.authReducer);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {
    if (Object.keys(currentUser).length === 0) {
      notification.info({
        message: "Bạn cần đăng nhập để thực hiện chức năng này",
      });
      setTimeout(() => {
        navigate(configRoute.routes.signin);
      }, 2000);
    } else {
      values.movieId = movie?._id;
      values.userId = currentUser?._id;

      dispatch(comenteCreate(values))
        .unwrap()
        .then((payload: any) => {
          message.success("Thêm comment thành công");
          dispatch(getOneMovie(slug));
          form.resetFields();
        })
        .catch((error: any) => console.log(error));
    }
  };

  return (
    <div className="w-full max-w-[1440p] max-h-[800px]  bg-white p-2 m-0">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="flex items-center gap-3">
          {currentUser !== null &&
          currentUser !== undefined &&
          currentUser?.avatar ? (
            <>
              <div className="avatar">
                {currentUser?.avatar || currentUser?.avatar?.url ? (
                  <Avatar src={currentUser?.avatar[0]?.url} />
                ) : (
                  <Avatar size="large" icon={<UserOutlined />} />
                )}
              </div>
            </>
          ) : (
            <>
              <Avatar size="large" icon={<UserOutlined />} />
            </>
          )}
          <div className=" mt-2 w-full">
            <Form.Item
              name="content"
              label="Nhập nội dung"
              rules={[{ required: true, message: "Không được để trống! " }]}
            >
              <TextArea
                id="content"
                name="content"
                className="w-100 w-full mt-2 py-2 px-2 rounded-lg  border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                placeholder={`Nội dung bạn muốn phản hồi `}
              />
            </Form.Item>
          </div>
        </div>
        <div className="pl-[50px]">
          <Form.Item
            name="rating"
            label="Điểm đánh giá"
            rules={[{ required: true, message: "Không được để trống! " }]}
          >
            <Rate />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#094196",
                outline: "none",
                marginTop: "10px",
              }}
            >
              Gửi
            </Button>
          </Form.Item>
        </div>
      </Form>

      <div className="pl-[50px] h-[670px]">
        <p className="text-normal text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-400 mt-2">
          Nội dung bình luận chỉ mang tính chất tham khảo
        </p>
        <div className="showAllComment">
          <div className="info">
            {allCmt ? (
              <>
                {allCmt?.map((item: any) => (
                  <Comment
                    key={item?._id}
                    author={<a>{item?.userId?.username}</a>}
                    avatar={
                      item?.avatar ? (
                        <Avatar size="large" icon={<UserOutlined />} />
                      ) : (
                        <Avatar src={currentUser?.avatar[0]?.url} />
                      )
                    }
                    content={<p>{item?.content}</p>}
                    datetime={
                      <Tooltip title={item?.createdAt}>
                        {formatTime(item?.createdAt)},
                        {formatDateString(item?.createdAt)}
                        <div className="rating">
                          <Rate defaultValue={item?.rating} />
                        </div>
                      </Tooltip>
                    }
                  />
                ))}
              </>
            ) : (
              <>Chưa có bình luận nào</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comente;
