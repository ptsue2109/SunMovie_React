import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Form, Input, message, Rate, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { comenteCreate } from "../../../redux/slice/ComenteSlice";
import { getOneMovie } from "../../../redux/slice/Movie";

type Props = {
  data: any;
};

const Comente = (props: Props) => {
  const { slug } = useParams();
  const { oneMovie: data } = useAppSelector((state: any) => state.movie);
  const { currentUser, isLogged } = useAppSelector(
    (state) => state.authReducer
  );
  const { currentComent } = useAppSelector((state) => state.ComenterReducer);

  const [form] = Form.useForm();
  const [flag, setFlag] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const onFinish = async (values: any) => {
    values.movie = data.movie._id;
    values.user = currentUser._id;
    const { meta, payload } = await dispatch(comenteCreate(values));

    if (meta.requestStatus == "fulfilled") {
      message.success("Thêm thành công");
    } else {
      message.error(`${payload}`);
    }
  };
  // console.log(data.movie._id);
  // console.log(currentUser._id);
  console.log(data);
  console.log("movie: ", data.movie);
  console.log("comment: ", data.comment);
  console.log(
    "data user: ",
    data.comment.map((item: any) => item.user)
  );
  // console.log(data.movie.comment.user);

  return (
    <section className="container max-w  mx-auto  justify-center ">
      <div className=" items-top justify-center h-full dark:bg-gray-900 sm:items-center sm:pt-0 ">
        <div className="max-w-6xl mx-auto p-10">
          <div className=" overflow-hidden">
            <div className=" ">
              <div className="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg">
                <Form
                  className="p-6  justify-center"
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                >
                  <div className=" mt-2">
                    <Form.Item
                      name="content"
                      label="content"
                      rules={[
                        { required: true, message: "Không được để trống! " },
                      ]}
                    >
                      <textarea
                        id="content"
                        name="content"
                        rows={4}
                        className="w-100 mt-2 py-2 px-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                        placeholder={`Nội dung bạn muốn phản hồi `}
                      />
                    </Form.Item>
                    <Form.Item
                      name="rating"
                      label="rating"
                      rules={[
                        { required: true, message: "Không được để trống! " },
                      ]}
                    >
                      <Rate className="" defaultValue={5} />
                    </Form.Item>
                  </div>
                  <button
                    type="submit"
                    className="md:w-32 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300"
                  >
                    Gửi
                  </button>
                </Form>
                <h1 className="text-4xl sm:text-3xl text-gray-800 dark:text-white font-extrabold tracking-tight mt-20">
                  Bình Luận
                </h1>
                <p className="text-normal text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-400 mt-2">
                  Nội dung bình luận chỉ mang tính chất tham khảo
                </p>

                {data.comment?.map((item: any, index: any) => (
                  <div
                    className="flex items-center mt-4 text-gray-600 dark:text-gray-400"
                    key={index}
                  >
                    <img src={item.user.avatar} alt={item.user?.avatar} />
                    <h5 className="user__title">{item.user?.username}</h5>
                    <Rate className="" value={item.rating} />
                    <Link
                      to="mailto:minhtuan0330@gmail.com"
                      className="ml-4 text-md text-gray-600 dark:text-gray-400 tracking-wide font-semibold"
                    >
                      <p>{item.content}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comente;
