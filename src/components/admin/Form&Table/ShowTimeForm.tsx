import React, { useState, useEffect } from "react";
import {
   Button,
   Card,
   DatePicker,
   FormInstance,
   Select,
   Skeleton,
   InputNumber,
   Form,
} from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import { validateMessages } from "../../../ultils/FormMessage";
import moment from "moment";
import { defaultStatus } from "../../../ultils/data";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import "antd/dist/antd.css";
import { convertDate, convertMovieTime, formatCurrency } from "../../../ultils";
import { getAlSt } from "../../../redux/slice/ShowTimeSlice";
import isBefore from "date-fns/isBefore";
import {
   compareAsc,
   differenceInBusinessDays,
   differenceInDays,
   differenceInMinutes,
   format,
   isEqual,
   parseISO,
   sub,
} from "date-fns";
import formatDistance from 'date-fns/formatDistance'
interface ShowTimeFormProps {
   form: FormInstance<any>;
   onFinish: (values: any) => void;
   onReset?: () => void;
   edit?: boolean;
   editUser?: boolean;
   loading?: boolean;
   extraPrice: any;
   setExtraprice: any;
   movieId: any;
   setTimeEnd: any;
   timeEnd: any;
}
const { RangePicker } = DatePicker;
const ShowTimeForm = ({
   form,
   movieId,
   onFinish,
   onReset,
   edit = false,
   loading = false,
   editUser = true,
}: ShowTimeFormProps) => {
   const dispatch = useAppDispatch();
   const { movie } = useAppSelector((state) => state.movie);
   const { rooms } = useAppSelector((state) => state.roomReducer);
   const [messRoom, setMessRoom] = useState<any>("");
   const [messTime, setMessTime] = useState<any>("");
   const [timeGet, setTimeGet] = useState<any>();
   const [roomSelect, setRoomSelect] = useState<any>();
   useEffect(() => {
      dispatch(getAlSt({}));
   }, []);
   const { stList } = useAppSelector((state) => state.ShowTimeReducer);
   let movieSelect = movie?.find((item: any) => item?._id === movieId);
   let movieTime = convertMovieTime(movieSelect?.runTime);
   let movieRelease = moment(movieSelect?.releaseDate).date()

   const [timeEnd, setTimeEnd] = useState<any>();
   const [priceExtra, setPriceExtra] = useState<any>();

   useEffect(() => {
      if (movieId) {
         form.setFieldsValue({
            movieId: movieId,
            releaseDate: moment(movieSelect?.releaseDate)
         });
      }
   }, [movieId]);
   useEffect(() => {
      if (timeEnd && priceExtra) {
         form.setFieldsValue({
            timeEnd: moment(timeEnd),
            price: priceExtra,
         });
      }
   }, [timeEnd]);

   // eslint-disable-next-line arrow-body-style
   const disabledDate: RangePickerProps["disabledDate"] = (current) => {
      return current && current <= moment().endOf("day");
   };

   const validRange = (value: any, dateString: any) => {
      setTimeEnd(moment(value).add(movieTime));
      let timeStart = moment(value).hour();
      let dayStart = moment(value).date()
      if (dayStart >= movieRelease) {
         if (timeStart >= 9 && timeStart <= 16) {
            setPriceExtra(20000);
         } else if (timeStart >= 17 && timeStart <= 21) {
            setPriceExtra(30000);
         } else {
            setPriceExtra(10000);
         }
      } else {
         if (timeStart >= 9 && timeStart <= 16) {
            setPriceExtra(40000);
         } else if (timeStart >= 17 && timeStart <= 21) {
            setPriceExtra(50000);
         } else {
            setPriceExtra(30000);
         }
      }


      let timeget = moment(value).format()
      setTimeGet(timeget);
   };
   const watchRoomId = (val: any) => {
      setRoomSelect(val)
   };

   const validateST = () => {
      const allShowTimeStart = stList?.map((item: any) => moment(item?.startAt).format());
      const allShowTimeEnd = stList?.map((item: any) => moment(item?.endAt).format());
      // console.log(allShowTimeEnd);

      let allRoomSelect = stList?.map((item: any) => item?.roomId[0]);
      allShowTimeStart.forEach((el: any) => {
         let getDateAllShowTimeStart = moment(el).dayOfYear()
         let getDateTimeGet = moment(timeGet).dayOfYear()
         let getHourAllShowTimeStart = moment(el).format("HH:mm");
         let getHourTimeGet = moment(timeGet).format("HH:mm");

         if (getDateAllShowTimeStart == getDateTimeGet && getHourAllShowTimeStart == getHourTimeGet) {
            setMessTime("Không được chọn khung giờ này")

            let checkroom: any = allRoomSelect?.filter((item: any) => item?._id?.includes(roomSelect));

            if (checkroom) {
               setMessRoom(`Phòng ${checkroom?.map((item: any) => item?.name)} được sử dụng, vui lòng chọn phòng khác`)
            } else if (!checkroom || checkroom == undefined || checkroom?.length == 0) {
               setMessRoom("")
               setMessTime("")
            }
         }
      });
   };
   useEffect(() => {
      validateST();
      if (!roomSelect) {
         setMessRoom("")
      }

   }, [timeGet, roomSelect, timeEnd, messTime, messRoom]);

   return (
      <Form
         layout="vertical"
         form={form}
         onFinish={onFinish}
         validateMessages={validateMessages}
      >
         <div className="grid grid-flow-col">
            {editUser ? (
               <>
                  <Card className="col-6 w-full">
                     <Form.Item
                        label="Chọn Phim"
                        name="movieId"
                        rules={[{ required: true }]}
                     >
                        <Select disabled>
                           {movie.map((item: any, index: any) => (
                              <Select.Option key={item._id} value={item[index]}>
                                 {item.name}
                              </Select.Option>
                           ))}
                        </Select>
                     </Form.Item>
                     <Form.Item
                        label="Ngày khởi chiếu"
                        name="releaseDate"
                        rules={[{ required: true }]}
                     >
                        <DatePicker format="DD-MM-YYYY" value={movieSelect?.releaseDate} disabled className="w-full" />
                     </Form.Item>
                     <div className="flex flex-wrap justify-between">
                        <Form.Item
                           label="Chọn thời gian phát sóng"
                           name="timeStart"
                           rules={[{ required: true }]}
                        >
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
                     {messTime && <div className="mt-[-10px] mb-3 text-danger">{messTime} </div>}
                     <Form.Item
                        label="Chọn phòng chiếu"
                        name="roomId"
                        rules={[{ required: true }]}
                     >
                        <Select mode="multiple" onChange={watchRoomId}>
                           {rooms.map((item: any, index: any) => (
                              <Select.Option key={item._id} value={item[index]}>
                                 {item.name}
                              </Select.Option>
                           ))}
                        </Select>
                     </Form.Item>
                     {messRoom && <div className="mt-[-10px] mb-3 text-danger"> {messRoom}</div>}

                  </Card>
                  <Card className="col-6 w-full">
                     <small className="block text-red-600 w-[300px] font-semibold">
                        <span className="text-black">Bảng giá extra:</span> <br />
                        Từ 9.am - 16.am: phụ thu {formatCurrency(20000)}
                        <br />
                        Từ 17.am - 21.pm: phụ thu {formatCurrency(30000)}
                        <br />
                        Sau 21.pm: phụ thu {formatCurrency(10000)}
                        <br />
                        <b>* Suất chiếu sớm: phụ thu {formatCurrency(20000)} + giờ chiếu</b>
                     </small>
                     <Form.Item
                        label="price"
                        name="price"
                        rules={[
                           {
                              type: "number",
                              required: true,
                              min: 10000,
                              max: 200000,
                              whitespace: true,
                           },
                        ]}
                     >
                        <InputNumber
                           disabled
                           min={10000}
                           formatter={(value) =>
                              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                           }
                           style={{ width: "40%" }}
                           step="10000"
                        />
                     </Form.Item>

                     <Form.Item
                        label="Chọn trạng thái"
                        name="status"
                        rules={[{ required: true }]}
                     >
                        <Select>
                           {defaultStatus &&
                              defaultStatus?.map((item: any) => (
                                 <Select.Option value={item.value} key={item.value}>
                                    {item.name}
                                 </Select.Option>
                              ))}
                        </Select>
                     </Form.Item>
                     <div className="col-12">
                        <Card
                           style={{
                              position: "sticky",
                              bottom: "0",
                              left: "0",
                              width: "100%",
                              border: "none",
                           }}
                        >
                           <div
                              style={{
                                 display: "flex",
                                 justifyContent: "start",
                                 gap: "5px",
                              }}
                           >
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
            ) : (
               <>
                  <Skeleton />
               </>
            )}
         </div>
      </Form>
   );
};

export default ShowTimeForm;
