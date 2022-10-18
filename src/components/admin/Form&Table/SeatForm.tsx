import React from 'react'
import { Button, Card, DatePicker, Form, FormInstance, Input, message, Modal, Select, Upload, Skeleton, InputNumber, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { validateMessages } from "../../../ultils/FormMessage";
import { useAppSelector } from '../../../redux/hook';
import styled from 'styled-components';
interface UserFormProps {
   form: FormInstance<any>;
   onFinish: (values: any) => void;
   onReset?: () => void;
   edit?: boolean;
   editData?: boolean;
   loading?: boolean;
}
const status = [
   { value: 0, name: "available" },
   { value: 1, name: "choosing" },
   { value: 2, name: "chosen" }
]
const rooms = [
   { _id: 1, value: 0, name: "Phòng 1" },
   { _id: 2, value: 1, name: "Phòng 2" },
   { _id: 3, value: 2, name: "Phòng 3" },
   { _id: 4, value: 3, name: "Phòng 4" },
]
const changeRoom = (values: any) => {
   console.log(values)
}
const SeatForm = ({ form, onFinish, onReset, edit = false, loading = false, editData = true }: UserFormProps) => {
   const { seatType } = useAppSelector(state => state.seatTypeReducer);
   return (
      <FormWrapper layout="vertical" form={form} onFinish={onFinish} validateMessages={validateMessages}>
         <div className="grid">
            {editData ? (
               <>
                  <Card className="col-12">
                     <Select style={{ width: '200px' }} onChange={changeRoom} >
                        {rooms && rooms.map((item, index) => (
                           <Select.Option value={item.name} key={index}>
                              {/* <Form.List name={item.name} key={index}>
                              {(fields, { add, remove }) => (
                                 <>
                                    {fields.map(({ key, name, ...restField }) => (
                                       <Space key={key} style={{ display: 'flex wrap', marginBottom: 8 }} align="baseline">
                                          <Form.Item
                                             {...restField}
                                             name={[name, 'seatTypeId']}
                                             rules={[{ required: true }]}
                                             style={{ width: '240px' }}
                                          >
                                             <Select placeholder="Chọn Loại Ghế" allowClear showSearch optionFilterProp="children">
                                                {seatType?.map((item) => (
                                                   <Select.Option key={item._id} value={item._id}>
                                                      {item.name}
                                                   </Select.Option>
                                                ))}
                                             </Select>
                                          </Form.Item>
                                          <Form.Item
                                             {...restField}
                                             name={[name, 'status']}
                                             rules={[{ required: true }]}
                                             style={{ width: '240px' }}>
                                             <Select placeholder="Trạng thái" allowClear showSearch optionFilterProp="children">
                                                {status?.map((item) => (
                                                   <Select.Option key={item.value} value={item.value}>
                                                      {item.name}
                                                   </Select.Option>
                                                ))}
                                             </Select>
                                          </Form.Item>
                                          <Form.Item
                                             {...restField}
                                             name={[name, 'roomId']}
                                             rules={[{ required: true }]}
                                             style={{ width: '240px' }}>
                                             <Select placeholder="Trạng thái" allowClear showSearch optionFilterProp="children">
                                                {rooms?.map((item) => (
                                                   <Select.Option key={item.value} value={item.value}>
                                                      {item.name}
                                                   </Select.Option>
                                                ))}
                                             </Select>
                                          </Form.Item>
                                          <MinusCircleOutlined onClick={() => remove(name)} />
                                       </Space>
                                    ))}
                                    <Form.Item>
                                       <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                          Tạo ghế
                                       </Button>
                                    </Form.Item>
                                 </>
                              )}
                           </Form.List> */}
                           </Select.Option>
                        ))}
                     </Select>


                  </Card>
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
               </>
            ) : (<>
               <Skeleton />
            </>)}
         </div>
      </FormWrapper>
   )
}

export default SeatForm;
const FormWrapper = styled(Form)`
   .ant-card-body{
     max-height: 700px;
     overflow-x: scroll
}  
 
  /* &.ant-card-body{
   height: 300px;
   max-height: 300px;
   overflow-x: scroll
  } */
`;