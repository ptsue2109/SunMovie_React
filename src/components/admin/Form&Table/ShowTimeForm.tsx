import React, { useState, useEffect } from 'react'
import { Button, Card, DatePicker, FormInstance, Select, Skeleton, InputNumber, Form } from "antd";
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { validateMessages } from "../../../ultils/FormMessage";
import moment from 'moment';
import { defaultStatus } from "../../../ultils/data"
import { useAppSelector } from '../../../redux/hook';
import "antd/dist/antd.css";
import { RangeValue } from 'rc-picker/lib/interface';
import { formatTime, convertDateToNumber, convertMovieTime, formatCurrency } from '../../../ultils';
import { useParams, useSearchParams } from 'react-router-dom';

interface ShowTimeFormProps {
   form: FormInstance<any>;
   onFinish: (values: any) => void;
   onReset?: () => void;
   edit?: boolean;
   editUser?: boolean;
   loading?: boolean;
   extraPrice: any;
   setExtraprice: any
   movieId: any;
   setTimeEnd: any;
   timeEnd: any
}
const { RangePicker } = DatePicker;
const ShowTimeForm = ({ form, movieId, onFinish, onReset, edit = false, loading = false, editUser = true }: ShowTimeFormProps) => {
   const { movie } = useAppSelector(state => state.movie);
   const { rooms } = useAppSelector(state => state.roomReducer);

   let movieSelect = movie?.find((item: any) => item?._id === movieId);
   let movieTime = convertMovieTime(movieSelect?.runTime);

   const [timeEnd, setTimeEnd] = useState<any>()
   const [priceExtra, setPriceExtra] = useState<any>()
   useEffect(() => {
      if (movieId) {
         form.setFieldsValue({
            movieId: movieId,
         });
      }
   }, [movieId]);
   useEffect(() => {
      if (timeEnd && priceExtra) {
         form.setFieldsValue({
            timeEnd: moment(timeEnd),
            price: priceExtra
         });
      }
   }, [timeEnd]);
   // eslint-disable-next-line arrow-body-style
   const disabledDate: RangePickerProps['disabledDate'] = (current) => {
      return current && current <= moment().endOf('day');
   };

   const validRange = (value: any, dateString: any) => {
      setTimeEnd(moment(value).add(movieTime));
      let timeStart = moment(value).hour();

      if (timeStart >= 9 && timeStart <= 16) {
         setPriceExtra(20000)
      } else if (timeStart >= 17 && timeStart <= 21) {
         setPriceExtra(30000)
      } else {
         setPriceExtra(10000)
      }

   }
   return (
      <Form layout="vertical" form={form} onFinish={onFinish} validateMessages={validateMessages} className="">
         <div className="grid grid-flow-col">
            {editUser ? (
               <>
                  <Card className="col-6 w-full">
                     <Form.Item label="Chọn Phim" name="movieId" rules={[{ required: true }]}>
                        <Select disabled>
                           {movie.map((item: any, index: any) => <Select.Option key={item._id} value={item[index]}>{item.name}</Select.Option>)}
                        </Select>
                     </Form.Item>
                     <div className="flex justify-between">
                        <Form.Item
                           label="Chọn thời gian phát sóng"
                           name="timeStart"
                           rules={[{ required: true }]} >
                           <DatePicker
                              disabledDate={disabledDate}
                              showTime={{ hideDisabledOptions: true, format: "HH:mm" }}
                              format="YYYY-MM-DD HH:mm"
                              onChange={validRange}
                              showNow={false}
                           />
                        </Form.Item>

                        <Form.Item
                           label="Thời gian kết thúc"
                           name="timeEnd"
                           rules={[{ required: true }]}
                        >
                           <DatePicker
                              disabled
                              showTime={{ hideDisabledOptions: true, format: "HH:mm" }}
                              showNow={false}
                              format="YYYY-MM-DD HH:mm"
                              onChange={validRange}
                           />
                        </Form.Item>
                     </div>

                     <Form.Item label="Chọn phòng chiếu" name="roomId" rules={[{ required: true }]}>
                        <Select mode='multiple'>
                           {rooms.map((item: any, index: any) => <Select.Option key={item._id} value={item[index]}>{item.name}</Select.Option>)}
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
                  <small className='block text-danger w-[230px]'>
                        Bảng giá extra: <br />
                        Từ 9am - 16am: phụ thu {formatCurrency(20000)}<br />
                        Từ 17am - 21pm: phụ thu {formatCurrency(30000)}<br />
                        Sau 21pm: phụ thu {formatCurrency(10000)}
                     </small>
                     <Form.Item label="price" name="price"
                        rules={[{ type: 'number', required: true, min: 10000, max: 200000, whitespace: true }]}
                     >
                        <InputNumber
                           disabled
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


