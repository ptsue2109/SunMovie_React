import React from 'react'
import styled from "styled-components";
import { BsPlus } from "react-icons/bs";
import { Button, Card, Form, FormInstance, Input, message, Modal, Select, Upload } from "antd";
import { useAppSelector } from "../../../redux/hook";
import { validateMessages } from "../../../ultils/FormMessage";
interface UserFormProps {
   form: FormInstance<any>;
   onFinish: (values: any) => void;
   fileList: any[];
   setFileList: React.Dispatch<any>;
   onReset?: () => void;
   edit?: boolean;
   editUser?: boolean;
   loading?: boolean;
}
const UserForm = ({ fileList, form, onFinish, setFileList, onReset, edit = false, loading = false, editUser = true }: UserFormProps) => {
   const { providers } = useAppSelector(state => state.providerReducer);
   const [previewImage, setPreviewImage] = React.useState<string>();
   const [previewVisible, setPreviewVisible] = React.useState<boolean>(false);

   const getBase64 = (file: any) => {
      return new Promise((resolve, reject) => {
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onload = () => resolve(reader.result);
         reader.onerror = (error) => reject(error);
      });
   };

   const handleCancel = () => setPreviewVisible(true);

   const handlePreview = async (file: any) => {
      // if (!file && !file.preview) {
      //    file.preview = await getBase64(file.originFileObj);
      // }
      setPreviewVisible(true);
      setPreviewImage(file);
   };

   const handleChange = async (data: any) => {
      const accepts = ["image/gif", "image/jpeg", "image/png", "image/webp"];
      const extensionFile = accepts.map((item) => item.split("image/")[1]);
      if (data.file.size / 1024 / 1024 > 2) {
         message.error("Kích thước ảnh tối đa 2MB");
         return;
      } else if (!accepts.includes(data.file.type)) {
         message.error(`Hình ảnh phải thuộc một trong các định dạng sau: ${extensionFile.join(", ")}`);
         return;
      }

      const files = data.fileList.map((item: any) => {
         if (item.originFileObj) {
            getBase64(item.originFileObj).then((result) => (item.base64 = result));
         }
         return item;
      });
      setFileList(files);
   };
   const roles = [
      { value: 0, name: "Khách hàng" },
      { value: 1, name: "Admin" }
   ];
   const status = [
      { value: 0, name: "Active" },
      { value: 1, name: "Inactive" }
   ];
   return (
      <Form layout="vertical" form={form} onFinish={onFinish} validateMessages={validateMessages}>
         <div className="grid">
            {editUser ? (
               <>
                  <Card className="col-6">
                     <Form.Item label="" style={{ alignItems: "left" }}>
                        <UploadCard beforeUpload={() => false} listType="picture-card" fileList={fileList} onPreview={handlePreview} onChange={handleChange}>
                           {fileList.length >= 2 ? null : <BsPlus size={36} fill="#d9d9d9" />}
                        </UploadCard>
                        <small>(Tải lên ít nhất 1 ảnh và tối đa 2 ảnh)</small>
                        <Modal open={previewVisible} footer={null} onCancel={handleCancel}>
                           <img style={{ width: "100%" }} src={previewImage} />
                        </Modal>
                     </Form.Item>
                     <Form.Item label="Tên người dùng" name="username" rules={[{ required: true, min: 5 }]}>
                        <Input placeholder="Nhập vào" />
                     </Form.Item>
                     <Form.Item label="Họ và tên" name="fullname" rules={[{ required: true, min: 5 }]}>
                        <Input placeholder="Nhập vào" />
                     </Form.Item>
                     <Form.Item label="SDT" name="phone" rules={[{ required: true }]} >
                        <Input placeholder="Nhập vào" />
                     </Form.Item>
                     <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                        <Input.Password placeholder="Nhập vào" />
                     </Form.Item>
                     <Form.Item label="email" name="email" rules={[{ required: true }]}>
                        <Input placeholder="Nhập vào" />
                     </Form.Item>
                     <Form.Item label="address" name="address">
                        <Select>
                           {providers && providers?.map((item: any, index: any) => (
                              <Select.Option value={item.name} key={index}>{item.name}</Select.Option>
                           ))}
                        </Select>
                     </Form.Item>
                  </Card>

                  <Card className="col-6">
                     <Form.Item label="Status" name="status">
                        <Select>
                           {status.map(item => <Select.Option key={item.value} value={item.value}>{item.name}</Select.Option>)}
                        </Select>
                     </Form.Item>
                     <Form.Item label="Chức vụ" name="role">
                        <Select>
                           {roles.map(item => <Select.Option key={item.value} value={item.value}>{item.name}</Select.Option>)}
                        </Select>
                     </Form.Item>
                  </Card>
               </>
            ) : (
               <>
                  <Card className="col-6">
                     <Form.Item label="" style={{ alignItems: "left" }}>
                        <UploadCard beforeUpload={() => false} listType="picture-card" fileList={fileList} onPreview={handlePreview} onChange={handleChange}>
                           {fileList.length >= 2 ? null : <BsPlus size={36} fill="#d9d9d9" />}
                        </UploadCard>
                        <small>(Tải lên ít nhất 1 ảnh và tối đa 2 ảnh)</small>
                        <Modal open={previewVisible} footer={null} onCancel={handleCancel}>
                           <img style={{ width: "100%" }} src={previewImage} />
                        </Modal>
                     </Form.Item>
                     <Form.Item label="Tên người dùng" name="username" rules={[{ required: true, min: 5 }]}>
                        <Input placeholder="Nhập vào" />
                     </Form.Item>
                     <Form.Item label="Họ và tên" name="fullname" rules={[{ required: true, min: 5 }]}>
                        <Input placeholder="Nhập vào" />
                     </Form.Item>
                     <Form.Item label="SDT" name="phone" rules={[{ required: true }]} >
                        <Input placeholder="Nhập vào" />
                     </Form.Item>
                     <Form.Item label="email" name="email" rules={[{ required: true }]}>
                        <Input placeholder="Nhập vào" />
                     </Form.Item>
                     <Form.Item label="address" name="address">
                        <Select>
                           {providers && providers?.map((item: any, index: any) => (
                              <Select.Option value={item.name} key={index}>{item.name}</Select.Option>
                           ))}
                        </Select>
                     </Form.Item>
                  </Card>

                  <Card className="col-6">
                     <Form.Item label="Status" name="status">
                        <Select>
                           {status.map(item => <Select.Option key={item.value} value={item.value}>{item.name}</Select.Option>)}
                        </Select>
                     </Form.Item>
                     <Form.Item label="Chức vụ" name="role">
                        <Select>
                           {roles.map(item => <Select.Option key={item.value} value={item.value}>{item.name}</Select.Option>)}
                        </Select>
                     </Form.Item>
                  </Card></>
            )}
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
         </div>
      </Form>
   )
}

export default UserForm;
const UploadCard = styled(Upload)`
    & .ant-upload-select-picture-card:hover {
        border-color: var(--ant-primary-color);
    }
    svg {
        fill: #d9d9d9;
        transition: fill 200ms ease;
    }
    & span:hover svg {
        fill: var(--ant-primary-color);
    }
`;
