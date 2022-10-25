import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { Button, Card, DatePicker, Form, FormInstance, Input, message, Modal, Select, Skeleton, InputNumber, TimePicker } from "antd";
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { MdChair } from 'react-icons/md'
import { validateMessages } from "../../../ultils/FormMessage";
import moment from 'moment';
import { defaultStatus } from "../../../ultils/data"
import { useAppSelector } from '../../../redux/hook';
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import configRoute from '../../../config';
interface ShowTimeFormProps {
   form: FormInstance<any>;
   onFinish: (values: any) => void;
   onReset?: () => void;
   edit?: boolean;
   editUser?: boolean;
   loading?: boolean;
   stDate: any;
   setStDate: any;
   startAt: any;
   setStartAt: any;
   endAt: any;
   setEndAt: any;
   extraPrice: any;
   setExtraprice: any
}
const { Option } = Select;
const ShowTimeForm = ({ form, onFinish, onReset, extraPrice, setExtraprice, startAt, setStartAt, endAt, setEndAt, edit = false, loading = false, editUser = true, stDate, setStDate }: ShowTimeFormProps) => {
   const { movie } = useAppSelector(state => state.movie);
   console.log('movie',movie);
   
   const { rooms } = useAppSelector(state => state.roomReducer);
   const { filmFormats } = useAppSelector(state => state.FormatReducer);
   const [hour, setHour] = useState<any>();

   console.log('hour', hour);
   // eslint-disable-next-line arrow-body-style
   const disabledDate: RangePickerProps['disabledDate'] = (current) => {
      return current && current <= moment().endOf('day');
   };

   const onChangeStartAt = (value: DatePickerProps['value'] | RangePickerProps['value'], dateString: [string, string] | string,) => {
      setStartAt(dateString);
      setHour((moment(dateString).format('HH:mm:ss').slice(0, 2)))
   };

   const onChangeEndAt = (value: DatePickerProps['value'] | RangePickerProps['value'], dateString: [string, string] | string,) => {
      setEndAt(dateString);
   };
   const onChangeDate = (value: DatePickerProps['value'] | RangePickerProps['value'], dateString: [string, string] | string,) => {
      setStDate(dateString)
   };


   return (
      <Form layout="vertical" form={form} onFinish={onFinish} validateMessages={validateMessages} className="">
         <div className="grid grid-flow-col">
            {editUser ? (
               <>
                  <Card className="col-6 w-full">
                     <Form.Item label="Chọn Phim" name="movieId" rules={[{ required: true }]}>
                        <Select mode='multiple'>
                           {movie.map((item: any, index:any) => <Select.Option key={item._id} value={item[index]}>{item.name}</Select.Option>)}
                        </Select>
                     </Form.Item>
                     <Form.Item label="Chọn ngày phát sóng" name="date" rules={[{ required: true }]}>
                        <DatePicker onChange={onChangeDate} format="YYYY-MM-DD"  disabledDate={disabledDate}   />
                     </Form.Item>

                     <Form.Item label="Chọn phòng chiếu" name="roomId" rules={[{ required: true }]}>
                        <Select mode='multiple'>
                           {rooms.map((item:any, index:any) => <Select.Option key={item._id} value={item[index]}>{item.name}</Select.Option>)}
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
                     <Form.Item label="Chọn giờ bắt đầu " name="startAt" rules={[{ required: true }]}>
                        <TimePicker onChange={onChangeStartAt} format="HH:mm" />
                     </Form.Item>
                     <Form.Item label="Chọn giờ bắt đầu " name="endAt" rules={[{ required: true }]}>
                        <TimePicker onChange={onChangeEndAt}   format="HH:mm" />
                     </Form.Item>
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


