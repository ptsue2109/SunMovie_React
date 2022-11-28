import React from 'react'
import styled from "styled-components";
import { Button, Card, DatePicker, Form, FormInstance, Input, message, Modal, Select, Upload, Skeleton } from "antd";
import { validateMessages } from "../../../ultils/FormMessage";
import { provices } from "../../../redux/slice/Provider";
import ImageUpload from "../../upload"
import { userRole, userStatus } from "../../../ultils/data"
import UpdatePassWord from '../UpdatePassword';
interface UserFormProps {
   form: FormInstance<any>;
   onFinish: (values: any) => void;
   avatarList: any[];
   setAvatarList: React.Dispatch<any>;
   newPass: string;
   setNewPass: React.Dispatch<any>;
   onReset?: () => void;
   edit?: boolean;
   editUser?: boolean;
   loading?: boolean;
   showPass: boolean;
   userId:any
}
const UserForm = ({ setNewPass, newPass, userId, setAvatarList, avatarList, showPass, form, onFinish, onReset, edit = false, loading = false, editUser = true }: UserFormProps) => {
   return (
      <Form layout="vertical" form={form} onFinish={onFinish} validateMessages={validateMessages}>
         <div className="grid grid-flow-col">
            {editUser ? (
               <>
                  <Card className="col-6 w-full">
                     <Form.Item label="Avatar" >
                        <ImageUpload imageList={avatarList} limit={2} key={1} />
                        <small>(Tải lên ít nhất 1 ảnh và tối đa 2 ảnh)</small>
                     </Form.Item>
                     <Form.Item label="Tên người dùng" name="username" rules={[{ required: true, min: 5, whitespace: true }]}>
                        <Input placeholder="Nhập vào" />
                     </Form.Item>
                     <Form.Item label="Họ và tên" name="fullname" rules={[{ required: true, min: 5 }]}>
                        <Input placeholder="Nhập vào" />
                     </Form.Item>
                     {showPass && <Form.Item label="Password" name="password" rules={[{ required: true, min: 5 }]}>
                        <Input.Password placeholder="Nhập vào" type="hidden" />
                     </Form.Item>}
                     <Form.Item label="SDT" name="phone" rules={[{ required: true, type: 'string', whitespace: true, len: 10 }]} >
                        <Input placeholder="Nhập vào" />
                     </Form.Item>

                  </Card>
                  <Card className="col-6 w-full">
                     <Form.Item label="email" name="email" rules={[{ required: true, type: 'email' }]}>
                        <Input placeholder="Nhập vào" />
                     </Form.Item>
                     <Form.Item label="Ngày sinh" name="dob" rules={[{ required: true }]} >
                        <DatePicker placeholder="Nhập vào" />
                     </Form.Item>
                     <Form.Item label="Status" name="status">
                        <Select>
                           {userStatus.map((item: any) => <Select.Option key={item.value} value={item.value}>{item.name}</Select.Option>)}
                        </Select>
                     </Form.Item>
                     <Form.Item label="Chức vụ" name="role">
                        <Select>
                           {userRole.map(item => <Select.Option key={item.value} value={item.value}>{item.name}</Select.Option>)}
                        </Select>
                     </Form.Item>
                     <Form.Item label="address" name="address">
                        <Select showSearch>
                           {provices && provices?.map((item: any, index: any) => (
                              <Select.Option value={item.name} key={index}>{item.name}</Select.Option>
                           ))}
                        </Select>
                     </Form.Item>
                     <UpdatePassWord  userId={userId}/>
                     <div className="col-12">
                        <Card style={{ position: "sticky", bottom: "0", left: "0", width: "100%", border: 'none' }}>
                           <div style={{ display: "flex", justifyContent: "start", gap: "5px" }}>
                              {onReset && (
                                 <Button htmlType="button" onClick={onReset}>
                                    Nhập lại
                                 </Button>
                              )}
                              <Button
                                 htmlType="submit"
                                 type="primary"
                                 style={{ minWidth: 150 }}
                              >
                                 Lưu
                              </Button>
                           </div>
                        </Card>
                     </div>
                  </Card>
                              
               </>
            ) : (<>
               <Skeleton />
            </>)}
         </div>
      </Form>
   )
}

export default UserForm;
