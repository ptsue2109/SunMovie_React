import React, { useState } from 'react';
import { Button, Form, Input, message, Modal, Radio } from 'antd';
import { updatePass } from '../../../redux/slice/userSlice';
import { useAppDispatch } from '../../../redux/hook';
interface Values {
   title: string;
   description: string;
   modifier: string;
}

interface CollectionCreateFormProps {
   open: boolean;
   onCreate: (values: Values) => void;
   onCancel: () => void;
}
interface updatePassProps {
   userId: any,
}

const UpdatePassWord = ({ userId }: updatePassProps) => {
   const [open, setOpen] = useState(false);
   const [mess, setMess] = useState('');
   const dispatch = useAppDispatch()
   const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
      open,
      onCreate,
      onCancel,
   }) => {
      const [form] = Form.useForm();
      return (
         <Modal
            open={open}
            title={`User: ${userId}`}
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
               form
                  .validateFields()
                  .then((values) => {
                     form.resetFields();
                     onCreate(values);
                  })
                  .catch((info) => {
                     console.log('Validate Failed:', info);
                  });
            }}
         >
            <Form form={form} layout="vertical" autoComplete="off">
               <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' },]} hasFeedback >
                  <Input.Password placeholder='New password' />
               </Form.Item>

               <Form.Item name="confirm" label="Confirm Password" dependencies={['password']} hasFeedback
                  rules={[{ required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                     validator(_, value) {
                        if (!value || getFieldValue('password') === value) { return Promise.resolve(); }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                     },
                  }),
                  ]}
               >
                  <Input.Password placeholder='Confirm password' />
               </Form.Item>
            </Form>
         </Modal>
      );
   };
   const onCreate = ({ password }: any) => {
      const payload = { newPassword: password, _id: userId };
      console.log(payload);
      
      dispatch(updatePass(payload)).unwrap()
         .then(() => {
            message.success('Đổi mật khẩu thành công');
            setOpen(false);
            setMess('');
         })
         .catch((error: any) => {
            message.success(error.response.data);
            setOpen(true);
         })

   };
   return (
      <div>
         <Button
            onClick={() => {
               setOpen(true);
            }}
         >
            Update password
         </Button>
         <CollectionCreateForm
            open={open}
            onCreate={onCreate}
            onCancel={() => {
               setOpen(false);
            }}
         />
      </div>
   );
};

export default UpdatePassWord;