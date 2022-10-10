import { Form, Button, message } from "antd";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserForm from '../../../components/admin/Form&Table/UserForm';
import config from '../../../config';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import {createUser} from "../../../redux/slice/userSlice"
type Props = {}

const UserCreate = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = React.useState<any[]>([]);
  const { errorMessage ,isSucess,isFetching,isErr} = useAppSelector((state) => state.userReducer);
  React.useEffect(() => {
    document.title = "Admin | Add Users";

    if(isSucess){
      navigate(config.routes.adminUserList);
      message.success({ content: "Thêm thành công", key: "handling" });
    }
    if(isErr){
      message.error({ content:`Failed: ${errorMessage} `, key: "handling" });
    }
  }, [isSucess,isFetching,isErr]);

  const onFinish = (data: any) => {
    data.avatar = fileList;
    dispatch(createUser(data))
  };

  const onReset = () => {
    form.resetFields();
    setFileList([]);
  };
  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={config.routes.adminUserList}>List users</Link>
      </Button>
      <UserForm
        onFinish={onFinish}
        form={form}
        fileList={fileList}
        setFileList={setFileList}
        onReset={onReset}
      />
    </div>
  )
}

export default UserCreate