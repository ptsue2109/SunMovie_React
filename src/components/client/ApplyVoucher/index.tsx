import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useAppSelector } from "../../../redux/hook";
import { discountPercent, formatCurrency, formatDate } from "../../../ultils";
import { isFuture, isPast, parseISO } from "date-fns";
type Props = {
   tempPrice: any;
};

const ApplyVoucher = ({ tempPrice }: Props) => {
   
   const [voucherMess, setVoucherMess] = useState("");
   const { vouchers } = useAppSelector((state: any) => state.voucherReducer);

   const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
   const upperText = (text: any) => {
      return text.toUpperCase();
   };

   const onFinish = ({ voucher }: any) => {
      if (voucher) {
         let upper = upperText(voucher);
         let item = vouchers.find((item: any) => item?.code === upper);
         if (item === undefined) {
            setVoucherMess("Không tìm thấy mã voucher");
         } else if (isPast(parseISO(item?.timeEnd))) {
            setVoucherMess("Voucher đã hết hạn sử dụng");
         } else if (isFuture(parseISO(item?.timeStart))) {
            setVoucherMess(`Voucher áp dụng từ ngày ${formatDate(item?.timeStart)}`);
         }
         else {
            let vcDiscount = item?.conditionNumber;
            let vcValue = item?.voucherValue; // tiền tối thiểu để giảm
            if (item?.voucherKey === "hóa đơn") {
               if (tempPrice < vcValue) {
                  setVoucherMess("Hóa đơn chưa đủ điều kiện để giảm");
               } else {
                  if (item?.condition === 1) {
                     setPriceAfterDiscount(tempPrice - vcDiscount);
                  } else {
                     let price:any = discountPercent(tempPrice , vcDiscount)
                     setPriceAfterDiscount(price);
                  }
               }
            }
         }
      }
   };

   return (
      <div className="flex">
         <Form onFinish={onFinish}>
            <div className="flex">
               <Form.Item name="voucher">
                  <Input type="text" style={{ width: "80%" }} placeholder="Áp mã" />
               </Form.Item>
               <p>Tiền tạm : {formatCurrency(tempPrice)}</p>
               <p>Tiền sau giảm : {formatCurrency(priceAfterDiscount)}</p>
               <small className="text-danger">{voucherMess}</small>
            </div>
            <Button htmlType="submit" type="primary" style={{ minWidth: 150 }}>
               Lưu
            </Button>
         </Form>
      </div>
   );
};

export default ApplyVoucher;
