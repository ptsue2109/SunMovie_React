import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { updateUser } from "../../../redux/slice/userSlice";
import UserForm from "../../../components/admin/Form&Table/UserForm";
import config from "../../../config";
interface Props { }

const UserEdit = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [avatarList, setAvatarList] = useState<any[]>([]);
  const { id } = useParams();
  const [newPass, setNewPass] = useState<any>(null);
  const { users, isSucess, isFetching, isErr, errorMessage } = useAppSelector(
    (state) => state.userReducer
  );
  const dataSelected = users.find((item) => item._id === id);

  useEffect(() => {
    document.title = `Admin | Edit ${dataSelected?.username ?? dataSelected?._id}`;
    if (dataSelected) {
      setAvatarList(dataSelected?.avatar as any[]);
       form.setFieldsValue({
        ...dataSelected,
      });
    }
  }, [dataSelected]);

  const onReset = () => {
    form.resetFields();
    setAvatarList([]);
  };

  const onFinish = (data: any) => {
    data._id = id;
    let avatarList = data?.avatarList?.fileList;
    if (avatarList) data.avatar = avatarList;
    else data.avatar = dataSelected?.avatar;
    delete data?.avatarList;

    dispatch(updateUser(data))
      .unwrap()
      .then(() => {
        navigate(config.routes.adminUserList);
        message.success("update thành công");
      })
      .catch(() => message.error(`${errorMessage}`));
  };
  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/admin/users">List users</Link>
      </Button>
      <UserForm
        onFinish={onFinish}
        form={form}
        avatarList={avatarList}
        newPass={newPass}
        setNewPass={setNewPass}
        setAvatarList={setAvatarList}
        onReset={onReset}
        edit={true}
      />
    </div>
  );
};

export default UserEdit;
