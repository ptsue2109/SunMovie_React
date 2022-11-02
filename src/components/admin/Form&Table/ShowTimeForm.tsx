import React, { useState, useEffect } from 'react'
import { Button, Card, DatePicker, Form, FormInstance, Select, Skeleton, InputNumber } from "antd";
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { validateMessages } from "../../../ultils/FormMessage";
import moment from 'moment';
import { defaultStatus } from "../../../ultils/data"
import { useAppSelector } from '../../../redux/hook';
import "antd/dist/antd.css";
import { RangeValue } from 'rc-picker/lib/interface';
import { formatTime, convertDateToNumber } from '../../../ultils';

interface ShowTimeFormProps {
   form: FormInstance<any>;
   onFinish: (values: any) => void;
   onReset?: () => void;
   edit?: boolean;
   editUser?: boolean;
   loading?: boolean;
   extraPrice: any;
   setExtraprice: any
}
const { RangePicker } = DatePicker;
const ShowTimeForm = ({ form, onFinish, onReset, extraPrice, setExtraprice, edit = false, loading = false, editUser = true }: ShowTimeFormProps) => {
   const { movie } = useAppSelector(state => state.movie);
   const { rooms } = useAppSelector(state => state.roomReducer);
   const { filmFormats } = useAppSelector(state => state.FormatReducer);
   const [errMess, setErrMess] = useState<string>('');
   const MESS: any = {
      SAMETIME: "Không được chọn thời gian giống nhau",
      UNDER: "thời gian kết thúc không được nhỏ hơn thời gian bắt đầu",
   }
   // eslint-disable-next-line arrow-body-style
   const disabledDate: RangePickerProps['disabledDate'] = (current) => {
      return current && current <= moment().endOf('day');
   };

   const validRange = (value: any, dateString: any) => {
      console.log('value', value);
      console.log('dateString', dateString);
   }
   return (
      <Form layout="vertical" form={form} onFinish={onFinish} validateMessages={validateMessages} className="">
         <div className="grid grid-flow-col">
            {editUser ? (
               <>
                  <Card className="col-6 w-full">
                     <Form.Item label="Chọn Phim" name="movieId" rules={[{ required: true }]}>
                        <Select mode='multiple'>
                           {movie.map((item: any, index: any) => <Select.Option key={item._id} value={item[index]}>{item.name}</Select.Option>)}
                        </Select>
                     </Form.Item>
                     <Form.Item
                        label="Chọn thời gian phát sóng"
                        name="timeValid"
                        rules={[{ required: true }]} >
                        <RangePicker
                           disabledDate={disabledDate}
                           showTime={{ hideDisabledOptions: true, format: "HH:mm" }}
                           format="YYYY-MM-DD HH:mm"
                           onChange={validRange}
                        />
                     </Form.Item>

                     <Form.Item label="Chọn phòng chiếu" name="roomId" rules={[{ required: true }]}>
                        <Select mode='multiple'>
                           {rooms.map((item: any, index: any) => <Select.Option key={item._id} value={item[index]}>{item.name}</Select.Option>)}
                        </Select>
                     </Form.Item>
                     <Form.Item label="Chọn filmFormatId" name="filmFormatId" rules={[{ required: true }]}>
                        <Select>
                           {filmFormats && filmFormats?.map((item: any) => (
                              <Select.Option value={item._id} key={item._id} >{item.name}</Select.Option>
                           ))}
                        </Select>
                     </Form.Item>

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
                  <Card className="col-6 w-full">

                     <Form.Item label="extraPrice" name="extraPrice"
                        rules={[{ type: 'number', required: true, min: 10000, max: 200000, whitespace: true }]}
                     >
                        <InputNumber
                           min={10000}
                           formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                           style={{ width: '40%' }}
                           step="10000"
                        />
                     </Form.Item>
                     <Form.Item label="Chọn trạng thái" name="status" rules={[{ required: true }]}>
                        <Select>
                           {defaultStatus && defaultStatus?.map((item: any) => (
                              <Select.Option value={item.value} key={item.value} >{item.name}</Select.Option>
                           ))}
                        </Select>
                     </Form.Item>

                  </Card>
               </>
            ) : (<>
               <Skeleton />
            </>)}
         </div>
      </Form>
   )
}

export default ShowTimeForm;


