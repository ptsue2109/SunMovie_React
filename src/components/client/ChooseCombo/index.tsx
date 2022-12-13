import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
   Button,
   message,
   Steps,
   Skeleton,
   Avatar,
   Divider,
   List,
   Form,
   Select,
   Input,
   InputNumber,
   Space,
   Statistic
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { formatCurrency, formatDateString, formatTime } from "../../../ultils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createFD } from "../../../redux/slice/FoodDetail";
import CountdownComp from "../Countdown";


type Props = {};
const { Countdown } = Statistic;

const ChooseCombo = (props: Props) => {
   const deadline = Date.now() + 1000 * 60 * 10;
   const { food } = useAppSelector((state) => state.food);
   let foodActive = food?.filter((item: any) => item?.status == 0);
   const [initLoading, setInitLoading] = useState(true);
   const [list, setList] = useState<any[]>([]);
   const { webConfigs } = useAppSelector((state: any) => state.WebConfigReducer);
   const [tempPrice, setTempPrice] = useState<any>();
   const [info, setInfo] = useState<any>();
   const { movie } = useAppSelector((state) => state.movie);
   const { state } = useLocation();
   const [foodOrder, setFoodOrder] = useState<any[]>([]);
   const [foodPrice, setFoodPrice] = useState<any>(0);
   const [cart, setCart] = useState<any[]>([]);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   let movieSelect = movie?.find(
      (item: any) => item?._id === state?.populatedDetail[0]?.showTimeId?.movieId
   );

   useEffect(() => {
      document.title = "Choose Combo";
      if (foodActive) {
         setInitLoading(false);
         setList(foodActive);
      }
   }, [food]);

   useEffect(() => {
      if (state && movieSelect) {
         setInfo(state?.populatedDetail);
         setTempPrice(state?.ticket?.totalPrice);
      }
   }, [state, movieSelect]);

   useEffect(() => {
      if (foodOrder) {
         const totalPrice = foodOrder.reduce((total, currentValue) => {
            return total + currentValue.price * currentValue.quantity;
         }, 0);
         setFoodPrice(totalPrice);
      }
   }, [foodOrder]);

   const handleFood = (qt: any, val: any) => {
      let foodprice = val?.price * qt;
      let pl = { foodId: val, quantity: qt, price: foodprice };
      setCart([...cart, pl]);
   };

   useEffect(() => {
      if (cart) {
         const arrayFiltered: any[] = [];
         cart.forEach((obj: any) => {
            const item = arrayFiltered.find(
               (thisItem) => thisItem.foodId?._id === obj.foodId?._id
            );
            if (item) {
               if (item.quantity < obj.quantity) {
                  item.quantity = obj.quantity;
               }
               return;
            }
            arrayFiltered.push(obj);
         });
         setFoodOrder(arrayFiltered);
      }
   }, [cart]);

   const nextStep = () => {
      dispatch(createFD(foodOrder))
         .unwrap()
         .then((data: any) => {
            let stateToNextStep = {
               ...state,
               finalPrice: tempPrice + foodPrice,
               foodDetailId: data?._id,
               foodDetail: foodOrder,
            };
            navigate("/payment", { state: stateToNextStep });
         });
   };

   const listRender = () => {
      return (
         <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item: any) => (
               <List.Item actions={[<a key="list-loadmore-edit"></a>]}>
                  <Skeleton
                     avatar
                     title={false}
                     loading={item.loading}
                     active
                  >
                     <List.Item.Meta
                        avatar={<Avatar src={item?.image[0]?.url} />}
                        title={<b className="uppercase">{item?.name}</b>}
                        description={`stock: ${item?.stock
                           } , price: ${formatCurrency(item?.price)}`}
                     />
                     <InputNumber
                        min={0}
                        defaultValue={0}
                        max={item?.stock}
                        onChange={(val: any) => {
                           handleFood(val, item);
                        }}
                     />
                  </Skeleton>
               </List.Item>
            )}
         />
      )
   }
   return (
      <>
         {foodActive ? (
            <div className="flex flex-row justify-center mt-16 ">
               <div className="w-[55%]">
                  <div className="bg-[#f6710d] h-[580px] ">
                     <div className="flex items-center justify-between p-2">
                        <h1 className="text-3xl p-3 text-white ">
                           Choose your favorite food
                        </h1>
                        <div className="">
                           <CountdownComp deadline={deadline} />
                        </div>
                     </div>
                     <div className="bg-[#ffffff] h-[480px] w-[98%] mx-auto p-3">
                        {listRender()}
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
                  <h1 className="font-bold uppercase px-4 pt-2">
                     {movieSelect?.name}
                  </h1>
                  {info && (
                     <>
                        <ul className="px-4 py-3">
                           <li className="border-b-2 border-dotted border-black leading-10">
                              <b>Rạp</b>: {webConfigs[0]?.storeName} |{" "}
                              {info && <>{info[0]?.seatId?.roomId?.name}</>}
                           </li>
                           <li className="border-b-2 border-dotted border-black leading-10">
                              <b>Suất chiếu</b>:{" "}
                              {info && formatTime(info[0]?.showTimeId?.startAt)} |{" "}
                              {formatDateString(info[0]?.showTimeId?.date)}
                           </li>
                           <li className="border-b-2 border-dotted border-black leading-10">
                              <b>Food</b> :{" "}
                              {foodOrder?.map((item: any) => (
                                 <span key={item?.foodId?._id}>
                                    {item?.foodId?.name}
                                    {`(${item?.quantity})`}
                                 </span>
                              ))}
                           </li>
                           <li className="border-b-2 border-dotted border-black leading-10">
                              <b>Ghế</b>:{" "}
                              {info &&
                                 info?.map((item: any) => (
                                    <span key={item?._id}>
                                       {item?.seatId?.row}
                                       {item?.seatId?.column},
                                    </span>
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
   );
};

export default ChooseCombo;
