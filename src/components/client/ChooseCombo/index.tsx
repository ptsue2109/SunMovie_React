import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { Button, message, Steps, Skeleton, Avatar, Divider, List, Form, Select, Input, InputNumber, Space, } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { formatCurrency, formatDateString, formatTime } from '../../../ultils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { validateMessages } from '../../../ultils/FormMessage';
import { createFD } from '../../../redux/slice/FoodDetail';
type Props = {}


const ChooseCombo = (props: Props) => {
   const { food } = useAppSelector((state) => state.food);
   const [initLoading, setInitLoading] = useState(true);
   const [list, setList] = useState<any[]>([]);
   const [keyboard, setKeyboard] = useState(true);
   const { webConfigs } = useAppSelector((state: any) => state.WebConfigReducer);
   const [tempPrice, setTempPrice] = useState<any>();
   const [info, setInfo] = useState<any>();
   const { movie } = useAppSelector((state) => state.movie)
   const { state } = useLocation();
   const [foodOrder, setFoodOrder] = useState<any[]>([]);
   const [foodPrice, setFoodPrice] = useState<any>(0);
   const dispatch = useAppDispatch();
   const navigate = useNavigate()
   let movieSelect = movie?.find((item: any) => item?._id === state?.populatedDetail[0]?.showTimeId?.movieId)
   let payload =
      [
         {
            foodId: {
               _id: "638f88e0f4c69a6585da2b0e",
               name: "bim bim",
               price: 12000,
               status: 0,
               stock: 12,
               image: [
                  {
                     uid: "rc-upload-1670350634255-9",
                     url: "http://res.cloudinary.com/asm-ph13269/image/upload/v1670351062/cdx1d3h0wxbxefgrv9t5.png",
                     thumbUrl: null,
                     lastModified: 1670345632990,
                     lastModifiedDate: "2022-12-06T16:53:52.990Z",
                     name: "unnamed (1).png",
                     size: 85871,
                     type: "image/png",
                     percent: 100,
                     originFileObj: {
                        uid: "rc-upload-1670350634255-9",
                        url: "http://res.cloudinary.com/asm-ph13269/image/upload/v1670351062/cdx1d3h0wxbxefgrv9t5.png",
                        thumbUrl: null
                     },
                     status: "done",
                     response: "ok"
                  }
               ],
               createdAt: "2022-12-04T10:18:36.357Z",
               updatedAt: "2022-12-04T10:20:32.030Z",
               __v: 0
            },
            quantity: 1,
            price: 12000

         },
         {
            foodId: {
               _id: "639012eb754c6a2d91cd64ff",
               name: "Bắp rang bơ",
               price: 12000,
               status: 0,
               stock: 12,
               image: [
                  {
                     uid: "rc-upload-1670350634255-9",
                     url: "http://res.cloudinary.com/asm-ph13269/image/upload/v1670386400/bpnygku1mymhy6aymkel.png",
                     thumbUrl: null,
                     lastModified: 1670345632990,
                     lastModifiedDate: "2022-12-06T16:53:52.990Z",
                     name: "unnamed (1).png",
                     size: 85871,
                     type: "image/png",
                     percent: 100,
                     originFileObj: {
                        uid: "rc-upload-1670350634255-9",
                        url: "http://res.cloudinary.com/asm-ph13269/image/upload/v1670351062/cdx1d3h0wxbxefgrv9t5.png",
                        thumbUrl: null
                     },
                     status: "done",
                     response: "ok"
                  }
               ],
               createdAt: "2022-12-04T10:18:36.357Z",
               updatedAt: "2022-12-04T10:20:32.030Z",
               __v: 0
            },
            quantity: 1,
            price: 12000

         }

      ];
   // console.log(payload);

   useEffect(() => {
      if (food) { setInitLoading(false); setList(food) }
      document.title = "Choose Combo";
   }, [food]);

   useEffect(() => {
      if (state && movieSelect) { setInfo(state?.populatedDetail); setTempPrice(state?.ticket?.totalPrice) }
   }, [state, movieSelect]);

   useEffect(() => {
      if (payload) {
         const totalPrice = payload.reduce((total, currentValue) => {
            return total + currentValue.price * currentValue.quantity
         }, 0);
         setFoodPrice(totalPrice)
      }
   }, [])

   const handleFood = (qt: any, val: any) => {
      console.log(qt, val);
      let chooseArr: any[] = []
      const existFood = chooseArr?.find((item: any) => item?.foodId?._id === val?._id);
      let foodprice = val?.price * qt
      if (existFood) {
         chooseArr.push( { foodId: val, quantity: qt, price: foodprice })
      } else {
         chooseArr = [...chooseArr, { foodId: val, quantity: qt, price: foodprice }]
      }
      console.log(chooseArr);

   }
   const nextStep = () => {
      dispatch(createFD(payload)).unwrap()
         .then((data: any) => {
            let stateToNextStep = {
               ...state,
               finalPrice: tempPrice + foodPrice,
               foodDetailId: data?._id,
               foodDetail: payload
            }
            navigate('/payment', { state: stateToNextStep })
         })
   }
   return (
      <>
         {food ? (
            <div className="flex flex-row justify-center mt-16 ">
               <div className="w-[55%]">
                  <div className="bg-[#f6710d] h-[580px] ">
                     <h1 className="text-3xl p-3 text-white ">Choose your favorite food</h1>
                     <div className="bg-[#ffffff] h-[480px] w-[98%] mx-auto p-3">
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
                                       avatar={<Avatar src={item?.image[0]?.url} />}

                                       title={<b className='uppercase'>{item?.name}</b>}
                                       description={`stock: ${item?.stock} , price: ${formatCurrency(item?.price)}`}
                                    />
                                    <InputNumber min={0} defaultValue={0} keyboard={keyboard} max={item?.stock} onChange={(val: any) => { handleFood(val, item) }} />

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
                              <b>Food</b> : {payload?.map((item: any) => item?.foodId?.name)}
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
                     Giá đồ ăn:
                     <span className="font-semibold text-xl text-[#dcdcd]">
                        {formatCurrency(foodPrice)}
                     </span>
                  </h2>
                  <h2 className="px-4 text-base">
                     Tổng:
                     <span className="font-semibold text-xl text-[#f6710d]">
                        {formatCurrency(tempPrice + foodPrice)}
                     </span>
                  </h2>
                  <Button
                     onClick={nextStep}
                     style={{
                        width: "47%",
                        marginLeft: "17px",
                        backgroundColor: "#f6710d",
                        border: "none",
                     }}
                     type="primary"
                     htmlType="submit"
                     className="hover: text-red-600"
                  >
                     Tiếp tục
                  </Button>
               </div>
            </div>
         ) : (
            <Skeleton />
         )}
      </>
   )
}

export default ChooseCombo;
