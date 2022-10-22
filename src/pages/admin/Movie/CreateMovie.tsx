import React, { useEffect } from "react";
import { Button, Form, Input, message, Select, Space } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { createMovie } from "../../../redux/slice/Movie"
import { useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import { Option } from "antd/lib/mentions";
type Props = {
};

const CreateMovie = (props: Props) => {
    const [form] = Form.useForm();
    const { movieType, isErr } = useAppSelector(
        (state) => state.movieTypeReducer
    );

    // const data = movieType?.map((item: any) => {
    //     return {
    //         _id: item._id,
    //         movieName: item.movieName,
    //     };
    // });
    // console.log(data); // 

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        const { meta, payload } = await dispatch(createMovie(values));
        if (meta.requestStatus == "fulfilled") {
            message.success("Thêm thành công");
            navigate(configRoute.routes.adminMovie);
        } else {
            message.error(`${payload}`);
        }
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

                <Form.Item label="movieTypeID" name="movieTypeID">
                    <Select>
                        {movieType && movieType?.map((item: any, index: any) => (
                            <Select.Option value={item._id} key={index}>{item.movieName}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="ageLimit"
                    label="ageLimit"
                    rules={[{ required: true, message: "Không được để trống! " }]}
                >
                    <Input />
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
                    >
                        <Select.Option value="true">true</Select.Option>
                        <Select.Option value="false">false</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name="isDelete" label="isDelete" rules={[{ required: true }]}>
                    <Select

                    >
                        <Select.Option value="true">true</Select.Option>
                        <Select.Option value="false">false</Select.Option>

                    </Select>
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
