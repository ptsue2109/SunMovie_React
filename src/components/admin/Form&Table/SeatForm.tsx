import React, { useState, useEffect } from 'react'
import { Button, Card, DatePicker, Form, FormInstance, Select, Skeleton, InputNumber, Typography } from "antd";
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { validateMessages } from "../../../ultils/FormMessage";
import moment from 'moment';
import { defaultStatus } from "../../../ultils/data"
import { useAppSelector } from '../../../redux/hook';
import "antd/dist/antd.css";
import { RangeValue } from 'rc-picker/lib/interface';
import { formatTime, convertDateToNumber } from '../../../ultils';

interface SeatFormProps {
   form: FormInstance<any>;
   onFinish: (values: any) => void;
   onReset?: () => void;
   edit?: boolean;
   editData?: boolean;
   loading?: boolean;

}
const { Title, Paragraph, Text, Link } = Typography;
const { RangePicker } = DatePicker;
const SeatForm = ({ form, onFinish, onReset, edit = false, loading = false, editData = true }: SeatFormProps) => {
   const { movie } = useAppSelector(state => state.movie);


   return (
      <Form layout="vertical" form={form} onFinish={onFinish} validateMessages={validateMessages} className="">
         <div className="grid grid-flow-col">
            {editData ? (
               <>
                  <Card className="col-12 w-full">

                     <Form.Item
                        label="Thời gian phát sóng"
                        rules={[{ required: true }]} >
                        <RangePicker
                           showTime={{ hideDisabledOptions: true, format: "HH:mm" }}
                           format="YYYY-MM-DD HH:mm"
                        />
                     </Form.Item>
                    
                     <div className="col-12">
                        <Card style={{ position: "sticky", bottom: "0", left: "0", width: "100%", border: 'none' }}>
                           <div style={{ display: "flex", justifyContent: "start", gap: "5px" }}>

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

export default SeatForm;


