import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { Button, message, Steps, Skeleton, Avatar, Divider, List, Form, Select, Input, InputNumber, Space, } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { formatCurrency, formatDateString, formatTime } from '../../../ultils';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateMessages } from '../../../ultils/FormMessage';

type Props = {}
const layout = {
   labelCol: { span: 7 },
   wrapperCol: { span: 12 },
};
function updateTotalItem(arr: any) {
   let total = 0;
   for (let i = 0; i < arr.length; i++) {
      const p = arr[i];
      total += p.price;
   }
   return total;
}

const ChooseCombo = (props: Props) => {
   const { food } = useAppSelector((state) => state.food);
   const [initLoading, setInitLoading] = useState(true);
   const [list, setList] = useState<any[]>([]);
   const [form] = Form.useForm();
   const [keyboard, setKeyboard] = useState(true);
   const { webConfigs } = useAppSelector((state: any) => state.WebConfigReducer);
   const [tempPrice, setTempPrice] = useState<any>();
   const [quantity, setQuantity] = useState<any>(0)
   const [info, setInfo] = useState<any>();
   const { movie } = useAppSelector((state) => state.movie)
   const { state } = useLocation();
   const [foodOrder, setFoodOrder] = useState<any[]>([]);

   let movieSelect = movie?.find((item: any) => item?._id === state?.populatedDetail[0]?.showTimeId?.movieId)

   useEffect(() => {
      if (food) { setInitLoading(false); setList(food) }
      document.title = "Choose Combo";
   }, [food]);

   useEffect(() => {
      if (state && movieSelect) { setInfo(state?.populatedDetail); setTempPrice(state?.ticket?.totalPrice) }
   }, [state, movieSelect]);

   const handleFood = (id: any, val: any) => {
      console.log(id, val);

   }

   const minus = (id: any) => {
      console.log(id);
   }

   return (
      <>
         {food ? (
            <div className="flex flex-row justify-center mt-16 ">
               <div className="w-[55%]">
                  <div className="bg-[#f6710d] h-[650px] ">
                     <h1 className="text-3xl p-3 text-white ">Choose your favorite food</h1>
                     <div className="bg-[#ffffff] h-[550px] w-[98%] mx-auto p-3">
                        <List
                           className="demo-loadmore-list"
                           loading={initLoading}
                           itemLayout="horizontal"

                           dataSource={list}
                           renderItem={(item: any) => (
                              <List.Item
                                 actions={[<a key="list-loadmore-edit"></a>]}
                              >
                                 <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta
                                       avatar={<Avatar src={item?.image} />}

                                       title={<b className='uppercase'>{item?.name}</b>}
                                       description={`stock: ${item?.stock} , price: ${formatCurrency(item?.price)}`}
                                    />
                                    <div><InputNumber min={0} defaultValue={0} keyboard={keyboard} max={item?.stock} onChange={(val: any) => { handleFood(val, item) }} /></div>


                                 </Skeleton>
                              </List.Item>
                           )}
                        />

                     </div>
                  </div>
               </div>
               <div className="w-[20%] bg-white ml-10 h-[580px] ">
                  <div className="w-[80%] mx-auto p-2">
                     <img
                        src={movieSelect?.image[0]?.url}
                        alt=""
                        className=" h-[140px]"
                     />
                  </div>
                  <h1 className="font-bold uppercase px-4 pt-2">{movieSelect?.name}</h1>
                  {info && (
                     <>
                        <ul className="px-4 py-3">
                           <li className="border-b-2 border-dotted border-black leading-10">
                              <b>Rạp</b>: {webConfigs[0]?.storeName} |  {info && (<>{info[0]?.seatId?.roomId?.name}</>)}
                           </li>
                           <li className="border-b-2 border-dotted border-black leading-10">
                              <b>Suất chiếu</b>:  {info && formatTime(info[0]?.showTimeId?.startAt)} |  {formatDateString(info[0]?.showTimeId?.date)}
                           </li>
                           <li className="border-b-2 border-dotted border-black leading-10">
                              <b>Food</b> : {foodOrder[0]?.item?.name}
                           </li>
                           <li className="border-b-2 border-dotted border-black leading-10">
                              <b>Ghế</b>: {info && info?.map((item: any) => (
                                 <span key={item?._id}>{item?.seatId?.row}{item?.seatId?.column},</span>
                              ))}
                           </li>
                        </ul>
                     </>
                  )}
                  <h2 className="px-4 text-base">
                     Tổng Giá:
                     <span className="font-semibold text-xl text-[#dcdcd]">
                        {formatCurrency(tempPrice)}
                     </span>
                  </h2>
                  <h2 className="px-4 text-base">
                     Tổng:
                     <span className="font-semibold text-xl text-[#f6710d]">
                        {formatCurrency(tempPrice)}
                     </span>
                  </h2>
               </div>
            </div>
         ) : (
            <Skeleton />
         )}
      </>
   )
}

export default ChooseCombo;
