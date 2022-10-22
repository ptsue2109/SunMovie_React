import { Button, DatePicker, Form, Input, message, Select } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { UpdateMovie } from "../../../redux/slice/Movie";
import moment from "moment";

type Props = {};

const UpdateMovies = (props: Props) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { movie, errMess } = useAppSelector((state) => state.movie);
  const data = movie.find((item: any) => item._id === id);
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

    dispatch(UpdateMovie(values))
      .unwrap()
      .then(() => {
        message.success({ content: "Sửa thành công" });
        navigate(configRoute.routes.adminMovie);
      })
      .catch(() => {
        message.error({ content: "Thất bại" });
      });
  };
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >

        <Form.Item
<<<<<<< SUNC-37-crud-edit-movie
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Không được để trống! " }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="runTime"
                    label="runTime"
                    rules={[{ required: true, message: "Không được để trống! " }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="ageLimit"
                    label="ageLimit"
                    rules={[{ required: true, message: "Không được để trống! " }]}
                >
                    <Select
                         placeholder=""
                        // onChange={onGenderChange}
                        // allowClear
                    >
                        <Option value="true">Trên 18 +</Option>
                        <Option value="false">Trên 22 +</Option>
                        <Option value="false">Khác </Option>
                        
                    </Select>
                </Form.Item>


                <Form.Item
                    name="language"
                    label="language"
                    rules={[{ required: true, message: "Không được để trống! " }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="country"
                    label="country"
                    rules={[{ required: true, message: "Không được để trống! " }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="actor"
                    label="actor"
                    rules={[{ required: true, message: "Không được để trống! " }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="director"
                    label="director"
                    rules={[{ required: true, message: "Không được để trống! " }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="description"
                    rules={[{ required: true, message: "Không được để trống! " }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="status"
                    rules={[{ required: true, message: "Không được để trống! " }]}
                >
                    <Select
                         placeholder=""
                        // onChange={onGenderChange}
                        // allowClear
                    >
                        <Option value="true">true</Option>
                        <Option value="false">false</Option>
                        
                    </Select>
                </Form.Item>

                <Form.Item name="isDelete" label="isDelete" rules={[{ required: true, message: "Không được để trống! "  }]}>
                    <Select
                         placeholder=""
                        // onChange={onGenderChange}
                        // allowClear
                    >
                        <Option value="true">true</Option>
                        <Option value="false">false</Option>
                        
                    </Select>
                </Form.Item>
=======
          name="name"
          label="Name"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="runTime"
          label="runTime"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="ageLimit"
          label="ageLimit"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Select
            placeholder=""
          // onChange={onGenderChange}
          // allowClear
          >
            <Option value="true">Trên 18 +</Option>
            <Option value="false">Trên 22 +</Option>
            <Option value="false">Khác </Option>

          </Select>
        </Form.Item>


        <Form.Item
          name="languages"
          label="languages"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="country"
          label="country"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="actor"
          label="actor"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="director"
          label="director"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="description"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="status"
          label="status"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Select
            placeholder=""
          // onChange={onGenderChange}
          // allowClear
          >
            <Select.Option key="true" value="true">true</Select.Option>
            <Select.Option key="false" value="false">false</Select.Option>

          </Select>
        </Form.Item>

        <Form.Item name="isDelete" label="isDelete" rules={[{ required: true, message: "Không được để trống! " }]}>
          <Select
            placeholder=""
          // onChange={onGenderChange}
          // allowClear
          >
            <Select.Option key="true" value="true">true</Select.Option>
            <Select.Option key="false" value="false">false</Select.Option>

          </Select>
        </Form.Item>
>>>>>>> dev

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateMovies;
