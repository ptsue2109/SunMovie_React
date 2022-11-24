import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, message, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { createMovie } from "../../../redux/slice/Movie";
import { Link, useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import moment from "moment";
import ImageUpload from "../../../components/upload";
type Props = {};

const CreateMovie = (props: Props) => {
  const [image, setImage] = useState<any[]>([]);
  const [form] = Form.useForm();
  const { movieType, isErr } = useAppSelector(
    (state: any) => state.movieTypeReducer
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    values.releaseDate = new Date(moment(values.releaseDate).format());
    values.image = values.avatarList?.fileList;
    delete values?.avatarList;
    const { meta, payload } = await dispatch(createMovie(values));
    if (meta.requestStatus == "fulfilled") {
      message.success("Thêm thành công");
      navigate(configRoute.routes.adminMovie);
    } else {
      message.error(`${payload}`);
    }
  };
  const config = {
    rules: [
      {
        type: "object" as const,
        required: true,
        message: "Please select time!",
      },
    ],
  };
  return (
    <>
      <Button type="primary" style={{ marginBottom: "20px" }}>
          <Link to="/admin/movies">List Movies</Link>
        </Button>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Image">
          <ImageUpload imageList={image} limit={1} key={1} />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="runTime"
          label="Run Time"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Movie Type"
          name="movieTypeId"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Select mode="multiple">
            {movieType &&
              movieType?.map((item: any, index: any) => (
                <Select.Option value={item._id} key={index}>
                  {item.movieName}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="ageLimit"
          label="Age Limit"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="languages"
          label="Languages"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="releaseDate"
          label="Release Date"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="actor"
          label="Actor"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="director"
          label="Director"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="trailerUrl" label="Trailer URL">
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input.TextArea />
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

export default CreateMovie;
