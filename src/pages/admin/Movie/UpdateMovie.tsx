import { Button, DatePicker, Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { UpdateMovie } from "../../../redux/slice/Movie";
import moment from "moment";
import ImageUpload from "../../../components/upload";

type Props = {};

const UpdateMovies = (props: Props) => {
  const [image, setImage] = useState<any[]>([]);
  const { id } = useParams();
  const [form] = Form.useForm();
  const { movieType, isErr } = useAppSelector(
    (state) => state.movieTypeReducer
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { movie, errMess } = useAppSelector((state) => state.movie);
  const data = movie.find((item: any) => item._id === id);
  useEffect(() => {
    if (data) {
      setImage(data?.image);
      form.setFieldsValue({
        ...data,
        releaseDate: moment(data.releaseDate),
      });
    }
  }, [data]);

  const onFinish = async (values: any) => {
    values._id = id;
    values.releaseDate = new Date(moment(values.releaseDate).format());
    let imageOld = values.avatarList?.fileList;
    if (imageOld) values.image = imageOld;
    else values.image = values?.image;
    delete values?.imageOld;
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

export default UpdateMovies;
