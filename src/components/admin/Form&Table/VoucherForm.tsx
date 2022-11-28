import React, { useState, useEffect } from 'react'
import { Button, Card, Form, FormInstance, Input, message, DatePicker, Select, Upload, Skeleton, InputNumber, Switch } from "antd";
import { validateMessages } from "../../../ultils/FormMessage";
import ImageUpload from "../../upload"
import { defaultStatus } from "../../../ultils/data"
import TextArea from 'antd/lib/input/TextArea';

interface VoucherFormProps {
   form: FormInstance<any>;
   onFinish: (values: any) => void;
   avatarList: any[];
   setAvatarList: React.Dispatch<any>;
   onReset?: () => void;
   edit?: boolean;
   editData?: boolean;
   loading?: boolean;
}
const { Option } = Select;
const VoucherForm = ({ setAvatarList, avatarList, form, onFinish, onReset, edit = false, loading = false, editData = true }: VoucherFormProps) => {
  
   return (
      <Form layout="vertical" form={form} onFinish={onFinish} validateMessages={validateMessages}>
         <div className="grid grid-flow-col">
            {editData ? (
               <>
                  <Card className="col-6 w-full">
                     <Form.Item label="Thumbnail" >
                        <ImageUpload imageList={avatarList} limit={1} key={1} />
                     </Form.Item>
                     <Form.Item label="Voucher Code" name="code" rules={[{ required: true }]}>
                        <Input placeholder="Nhập mã Voucher" />
                     </Form.Item>
                     <Form.Item label="Voucher name" name="name" rules={[{ required: true }]}>
                        <Input placeholder="Nhập mã Voucher" />
                     </Form.Item>
                     <Form.Item label="Quantity" name="quantity" rules={[{ required: true }]} >
                        <InputNumber style={{ width: '100%' }} placeholder="Nhập số lượt sử dụng Voucher" />
                     </Form.Item>
                     <Form.Item label="Content" name="content" rules={[{ required: true }]} >
                        <TextArea placeholder="Nhập nội dung" />
                     </Form.Item>
                  </Card>
                  <Card className="col-6 w-full">
                     <Form.Item label="shortDesc" name="shortDesc">
                        <Input />
                     </Form.Item>
                     <Form.Item label="Condition" name="condition" rules={[{ required: true }]} >
                        <Select placeholder="Chọn điều kiện giảm">
                           <Option value={1}>Giảm theo tiền</Option>
                           <Option value={0}>Giảm theo %</Option>
                        </Select>
                     </Form.Item>

                     <Form.Item label="Condition Number" name="conditionNumber" className='w-full' rules={[{ required: true }]} >
                        <InputNumber style={{ width: '100%' }} placeholder="Nhập số lượng giảm theo điều kiện" />
                     </Form.Item>
                     <Form.Item label="Conditon with voucher value" name="voucherVal" rules={[{ required: true }]}>
                        <InputNumber placeholder="Nhập vào" style={{ width: '100%' }} />
                     </Form.Item>
                     <Form.Item
                        label="Thời gian hiệu lực"
                        name="timeValid"
                        rules={[{ required: true }]} >
                        <DatePicker.RangePicker showTime />
                     </Form.Item>

                     <Form.Item label="Status" name="status">
                        <Select>
                           {defaultStatus.map((item: any) => <Select.Option key={item.value} value={item.value}>{item.name}</Select.Option>)}
                        </Select>
                     </Form.Item>
                     <div className="col-12">
                        <Card style={{ position: "sticky", bottom: "0", left: "0", width: "100%", border: 'none' }}>
                           <div style={{ display: "flex", justifyContent: "start", gap: "5px" }}>
                              {onReset && (
                                 <Button htmlType="button" onClick={onReset}>  Nhập lại  </Button>
                              )}
                              <Button htmlType="submit" type="primary" style={{ minWidth: 150 }} >
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

export default VoucherForm;
