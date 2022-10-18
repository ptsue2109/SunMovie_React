import { Form, Button, message } from "antd";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserForm from '../../../components/admin/Form&Table/UserForm';
import config from '../../../config';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { createUser } from "../../../redux/slice/userSlice"
type Props = {}

const UserCreate = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [avatarList, setAvatarList] = useState<any[]>([]);
  const [newPass, setNewPass] = useState<string>('')
  const { errorMessage, isSucess, isFetching, isErr } = useAppSelector((state) => state.userReducer);
  useEffect(() => {
    document.title = "Admin | Add Users";
    if (isSucess) {
      navigate(config.routes.adminUserList);
      message.success({ content: "Thêm thành công", key: "handling" });
    }
    if (isErr) {
      message.error({ content: `Failed: ${errorMessage} `, key: "handling" });
    }
  }, [isSucess, isFetching, isErr]);

  const onFinish = (data: any) => {
    data.avatar = data.avatarList.fileList;
    dispatch(createUser(data))
  };

  const onReset = () => {
    form.resetFields();
    setAvatarList([]);
  };
  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={config.routes.adminUserList}>List users</Link>
      </Button>
      <UserForm
        onFinish={onFinish}
        form={form}
        avatarList={avatarList}
        setAvatarList={setAvatarList}
        onReset={onReset}
        newPass={newPass}
        setNewPass={setNewPass}
      />
    </div>
  )
}

export default UserCreate