import React, { useEffect, useState } from 'react'
import { formatCurrency, formatDateString, formatTime } from '../../../ultils'
import "./order.scss"
import { Button, notification, Skeleton } from "antd"
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { updateOrder } from '../../../redux/slice/OrdersSlice'
type Props = {
   detail?: any,
   order?: any,
   totalPriceFinal?: any,
   showQR?: any,
   closeModal?: any,
   isAdmin?:any
}

const Ticket = ({ detail, order, totalPriceFinal, showQR, closeModal, isAdmin }: Props) => {
   const [qrActive, setQrActive] = useState<any>(false);
   const dispatch = useAppDispatch();

   console.log(order);
   const { currentUser } = useAppSelector((state) => state?.authReducer)
   // useEffect(() => {
   //    if (currentUser) {

   //    }
   // }, [currentUser])
   const handle = () => {
      setQrActive(true)
      let payload = {
         _id: order?._id,
         status: 3
      }
      dispatch(updateOrder(payload)).unwrap()
         .then(() => {
            setTimeout(() => {
               notification.success({ message: "Voucher đã được quét" });
               closeModal(false)
            }, 3000);
         })
         .catch(() => {
            setTimeout(() => {
               notification.error({ message: "Lỗi, vui lòng thử lại sau" })
            }, 3000);
         })
   }
   const handleClose = () => {
      setQrActive(false)

   }
   return (
      <>
         {detail && order ? (
            <div className='cardContainer'>
               <div className="ticket">
                  <div className="ticket--start">
                     <img src="https://i.ibb.co/W3cK42J/image-1.png" />
                  </div>
                  <div className="ticket--center">
                     <div className="ticket--center--row">
                        <div className="ticket--center--col">
                           <span>Your ticket for</span>
                           <strong>{detail[0]?.movie}</strong>
                        </div>
                        <div className="ticket--center--col">
                           <span className="ticket--info--title">Order info</span>
                           <span className="ticket--info--content">Order {order?._id}. Ordered By {order?.userId?.username}</span>
                        </div>
                     </div>
                     <div className="ticket--center--row">
                        <div className="ticket--center--col">
                           <span className="ticket--info--title">Date and time</span>
                           <span className="ticket--info--subtitle">{formatDateString(detail[0]?.startAt)}</span>
                           <span className="ticket--info--content"> {formatTime(detail[0]?.startAt)}  to {formatTime(detail[0]?.endAt)}</span>
                        </div>
                        <div className="ticket--center--col">
                           <span className="ticket--info--title">Bevager</span>
                           <div className="ticket--info--subtitle">SL: {order?.foodDetailId?.food?.map((item: any) => (
                              <span key={item?.foodId?._id}>{item?.foodId?.name}{`(${item?.quantity}),`}</span>
                           ))}</div>
                           <span className="ticket--info--content">{` price: ${formatCurrency(order?.foodDetailId?.totalPrice)}`}</span>
                        </div>

                     </div>
                     <div className="ticket--center--row">
                        <div className="ticket--center--col">
                           <span className="ticket--info--title">Ticket </span>
                           <span className="ticket--info--content">Seat: {detail[0]?.seats} {`(${order?.ticketId?.quantity} ticket)`}</span>
                           <span className="ticket--info--content">Room: {detail[0]?.room}</span>
                           <span className="ticket--info--content">Ticket Price: {detail[0]?.totalPrice}</span>
                        </div>
                        <div className="ticket--center--col">
                           <span className="ticket--info--title">Payment</span>
                           <span className="ticket--info--subtitle">{` price: ${formatCurrency(totalPriceFinal)}`}</span>
                           <span className="ticket--info--content">{` status: ${order?.status === 1 ? "Đã thanh toán" : "Chưa thanh toán"}`}</span>
                        </div>
                        {isAdmin? (
                           <>
                              <div className="qr">
                                 <Button type='link' onClick={handle}>
                                    Quét mã QR ngay
                                 </Button>

                              </div>
                              {qrActive && (
                                 <>
                                    <Button type='link' onClick={handleClose}>
                                       Ẩn QR
                                    </Button>
                                    <img src={order?.qrCode} className="w-[460px] h-[460px]" />
                                 </>
                              )}

                              <div className="ticket--end">
                                 <div><img src={order?.qrCode} /></div>
                                 <div><img src="https://qidoon.com/assets/img/logo.svg" /></div>
                              </div>  </>
                        ) : ""}
                     </div>
                  </div>

               </div>

            </div>
         ) : (
            <>
               <Skeleton />
            </>
         )}
      </>
   )
}

export default Ticket