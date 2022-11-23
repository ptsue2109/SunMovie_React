// import { Button, Card, Form, Tag, Typography, Collapse, Descriptions, Select, Space, message } from "antd";
// import React, { useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../../redux/hook";
// import { getAlSt } from "../../../redux/slice/ShowTimeSlice";
// import config from "../../../config";
// import { CaretRightOutlined } from "@ant-design/icons";
// import { formatTime, formatDateString, formatCurrency } from "../../../ultils";
// import { createData } from "../../../redux/slice/SeatBySTSlice";
// import styled from "styled-components";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
// import Popconfirm from "antd/es/popconfirm";

// type Props = {};
// const { Text } = Typography;
// const { Panel } = Collapse;
// const { Option } = Select;

// const ShowTimeSeat = (props: Props) => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   useEffect(() => { 
//     (async() => {
//       dispatch(getAlSt({})) 
//     })();
//   }, [dispatch]);
//   const { stList } = useAppSelector((state:any) => state.ShowTimeReducer);
//   const { seatsByST } = useAppSelector((state:any) => state.SeatBySTReducer);
//   const newSeatByST = seatsByST.filter((item: any) => item?.showTimeId?._id === id);
//   const dataSelected = stList.find((item: any) => item._id === id);
//   const [form] = Form.useForm();
//   const onFinish = (val: any) => {
//     val.showTimeId = id;
//     dispatch(createData(val)).unwrap()
//       .then(() => { onReset(); message.success("Tạo ghế thành công"); setTimeout(() => { navigate(config.routes.AdminShowTimes) }, 2000) })
//       .catch(() => message.error("Tạo thất bại"));
//   };
//   const onReset = () => {
//     form.resetFields();
//   };
//   const deleteData = (id: string | undefined) => {
//     console.log('id', id);
//   }
//   const arrangeSeat = () => {
//     return (
//       <>
//         <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" >
//           <Form.Item label="Chọn phim" name="movieId" rules={[{ required: true }]}  >
//             <Select>
//               {dataSelected?.movieId &&
//                 dataSelected?.movieId?.map((item: any) => (
//                   <Select.Option value={item._id} key={item._id} >  {item.name} </Select.Option>
//                 ))}
//             </Select>
//           </Form.Item>
//           <Form.Item label="Chọn phòng" name="roomId" rules={[{ required: true }]} >
//             <Select  mode={"multiple"} >
//               {dataSelected?.roomId &&
//                 dataSelected?.roomId?.map((item: any) => (
//                   <Select.Option value={item._id} key={item._id}>{item.name}</Select.Option>
//                 ))}
//             </Select>

//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">  Tạo ghế  </Button>
//             {onReset && (<Button htmlType="button" onClick={onReset} className="ml-3">  Nhập lại  </Button>)}
//           </Form.Item>
//         </Form>
//       </>
//     )
//   }
//   const renderSeatBySTId = () => {
//     return (
//       <>
//         {newSeatByST ?
//           newSeatByST.map((item: any) => (
//             <Space key={item?._id} className="flex flex-wrap">
//               <Card>
//                 <p>Tên phòng : {item?.roomId?.name ?? "Đang cập nhật"}</p>
//                 <p>ID phòng : {item?.roomId?._id ?? "Đang cập nhật"}</p>
//                 <p>Tên phim : {item?.movieId?.name ?? "Đang cập nhật"}</p>
//                 <Button size="middle" type="link">
//                   <Link to={`/admin/seats/_v=${item?._id}`}> Xem chi tiết </Link>
//                 </Button>
//               </Card>
//             </Space>
//           )) : (<Text className="text-danger"> Có lỗi, vui lòng thử lại sau</Text>)}
//       </>
//     )
//   }
//   const showTimeOverview = () => {
//     return (
//       <>
//         {dataSelected ? (
//           <Custom>
//             <Descriptions title=" Tổng quan">
//               <Descriptions.Item label="Phim đã chọn">
//                 {dataSelected.movieId.map((item: any) => (
//                   <Tag key={item?._id}> {item?.name}</Tag>
//                 ))}
//               </Descriptions.Item>
//               <Descriptions.Item label="Rạp đã chọn">
//                 {dataSelected.roomId.map((item: any) => (
//                   <Tag key={item?._id}> {item?.name}</Tag>
//                 ))}
//               </Descriptions.Item>
//               <Descriptions.Item label="Ngày chiếu">
//                 <Text> {formatDateString(dataSelected?.date)}</Text>
//               </Descriptions.Item>
//               <Descriptions.Item label="Thời gian chiếu">
//                 <Text>
//                   {formatTime(dataSelected?.startAt)} - {formatTime(dataSelected?.endAt)}
//                 </Text>
//               </Descriptions.Item>
//               <Descriptions.Item label="Format film">
//                 <Text> {dataSelected?.filmFormatId?.name}</Text>
//               </Descriptions.Item>
//               <Descriptions.Item label="Extra price">
//                 <Text> {formatCurrency(dataSelected.extraPrice)}</Text>
//               </Descriptions.Item>
//             </Descriptions>
//           </Custom>
//         ) : (
//           <>
//             <Text className="text-danger"> Có lỗi, vui lòng thử lại sau</Text>
//           </>
//         )}
//       </>
//     )
//   };

//   return (
//     <div>
//       <Button className="mb-5">
//         <Link to={config.routes.AdminShowTimes}>Xem giờ chiếu</Link>
//       </Button>
//       <Collapse bordered={false} defaultActiveKey={["1"]} expandIcon={({ isActive }) => (<CaretRightOutlined rotate={isActive ? 90 : 0} />)} className="site-collapse-custom-collapse">
//         <Panel header="Thông tin tổng quan" key="1">  {showTimeOverview()}  </Panel>
//         <Panel header="Xếp phòng" key="2"> {arrangeSeat()} </Panel>
//         <Panel header={`Xem kết quả`} key="3"> {renderSeatBySTId()}</Panel>
//       </Collapse>
//     </div>
//   );
// };

// export default ShowTimeSeat;
// const Custom = styled.div`
//   td{
//     &.ant-descriptions-item {
//     height: 10px !important;
//     }
//   }
// `;


import React from 'react'

type Props = {}

const ShowTimeSeat = (props: Props) => {
  return (
    <div>ShowTimeSeat</div>
  )
}

export default ShowTimeSeat