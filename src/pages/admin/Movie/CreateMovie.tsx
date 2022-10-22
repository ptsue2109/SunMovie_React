import React from "react";
import { Button, Form, Input, message, Select, Space, DatePicker } from "antd";
import { useAppDispatch } from "../../../redux/hook";
import { createMovie } from "../../../redux/slice/Movie"
import { useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import { Option } from "antd/lib/mentions";
import moment from "moment";
type Props = {};

const CreateMovie = (props: Props) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        console.log(values);
        values.releaseDate = moment(values.releaseDate).format('DD-MM-YYYY')
        const { meta, payload } = await dispatch(createMovie(values));
        if (meta.requestStatus == "fulfilled") {
            message.success("Thêm thành công");
            navigate(configRoute.routes.adminMovie);
        } else {
            message.error(`${payload}`);
        }
    };
    const config = {
        rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
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

                <Form.Item
                    name="ageLimit"
                    label="ageLimit"
                    rules={[{ required: true, message: "Không được để trống! " }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    name="languages"
                    label="languages"
                    rules={[{ required: true, message: "Không được để trống! " }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="releaseDate"
                    label="releaseDate"
                    rules={[{ required: true, message: "Không được để trống! " }]}
                >
                    <DatePicker format="DD-MM-YYYY" />
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

                    <Select>
                        <Select.Option value="true" key="true">true</Select.Option>
                        <Select.Option value="false" key="false">false</Select.Option>

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
