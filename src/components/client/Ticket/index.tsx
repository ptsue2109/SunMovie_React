import React from 'react'
import { formatDateString, formatTime } from '../../../ultils'
import "./order.scss"
import { Skeleton } from "antd"
type Props = {
   detail?: any,
   order?:any
}

const Ticket = ({ detail, order }: Props) => {
   console.log('detail',detail);
   console.log('order',order);
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
                     </div>
                     <div className="ticket--center--row">
                        <div className="ticket--center--col">
                           <span className="ticket--info--title">Date and time</span>
                           <span className="ticket--info--subtitle">{formatDateString(detail[0]?.startAt)}</span>
                           <span className="ticket--info--content"> {formatTime(detail[0]?.startAt)}  to {formatTime(detail[0]?.endAt)}</span>
                        </div>
                        <div className="ticket--center--col">
                           <span className="ticket--info--title">Payment</span>
                           <span className="ticket--info--subtitle">{` price: ${detail[0]?.totalPrice}`}</span>
                           <span className="ticket--info--content">{` status: ${order ?.status === 1 ?  "Đã thanh toán" : "Chưa thanh toán"}`}</span>
                        </div>
                     </div>
                     <div className="ticket--center--row">
                        <div className="ticket--center--col">
                           <span className="ticket--info--title">Ticket </span>
                           <span className="ticket--info--content">Seat: {detail[0]?.seats} {`(${order?.ticketId?.quantity} ticket)` }</span>
                           <span className="ticket--info--content">Room: {detail[0]?.room}</span>
                        </div>
                        <div className="ticket--center--col">
                           <span className="ticket--info--title">Order info</span>
                           <span className="ticket--info--content">Order {order?._id}. Ordered By {order?.userId?.username}</span>
                        </div>
                     </div>
                  </div>
                  <div className="ticket--end">
                     <div><img src={order?.qrCode} /></div>
                     <div><img src="https://qidoon.com/assets/img/logo.svg" /></div>
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