import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, message } from "antd";
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { updateUser } from "../../../redux/slice/userSlice";
import UserForm from "../../../components/admin/Form&Table/UserForm"
import config from "../../../config";
interface Props { }

const UserEdit = (props: Props) => {
   const [form] = Form.useForm();
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const [fileList, setFileList] = React.useState<any[]>([]);
   const { id } = useParams();

   const { users, isSucess, isFetching, isErr, errorMessage } = useAppSelector(state => state.userReducer);
   const dataSelected = users.find((item) => item._id === id);


   useEffect(() => {
      document.title = `Admin | Edit ${dataSelected?.username ?? dataSelected?._id}`;
      if (dataSelected) {
         console.log(dataSelected);

         setFileList(dataSelected?.avatar as any[]);
         form.setFieldsValue({
            ...dataSelected,
         });
      }
   }, [dataSelected]);
   const onReset = () => {
      form.resetFields();
      setFileList([]);
   };
   const onFinish = (data: any) => {
      data.avatar = fileList;
      data._id = id;
      console.log('update', data)
      dispatch(updateUser(data)).unwrap()
      .then(() =>{
         navigate(config.routes.adminUserList)
         message.success('update thành công')
      })
      .catch(() => message.error(`${errorMessage}`))
   };
   return (
      <div>
         <Button type="primary" style={{ marginBottom: "20px" }}>
            <Link to="/admin/users">List users</Link>
         </Button>
         <UserForm
            onFinish={onFinish}
            form={form}
            fileList={fileList}
            setFileList={setFileList}
            onReset={onReset}
            edit={true}  />
      </div>
   );
};

export default UserEdit;