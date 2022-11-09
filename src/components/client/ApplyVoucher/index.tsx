import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useAppSelector } from "../../../redux/hook";

type Props = {
   tempPrice: any;
};

const ApplyVoucher = ({ tempPrice }: Props) => {
   const [voucherMess, setVoucherMess] = useState("");
   const { vouchers } = useAppSelector((state: any) => state.voucherReducer);


   const [priceAfterDiscount, setPriceAfterDiscount] = useState(0)
   const upperText = (text: any) => {
      return text.toUpperCase();
   };
   const onDiscount = (item: any) => {
      console.log('item', item);

   }
   const onFinish = ({ voucher }: any) => {
      if (voucher) {
         let upper = upperText(voucher);
         let item = vouchers.find((item: any) => item?.code === upper);
         console.log("item", item);

         if (item === undefined) {
            setVoucherMess("Không tìm thấy mã voucher");
         } else {
            let vcDiscount = item?.conditionNumber;
            let vcValue = item?.voucherValue;
            if (item?.voucherKey === "hóa đơn") {
               if (vcValue <= tempPrice) {
                  setVoucherMess('Hóa đơn chưa đủ điều kiện để giảm')
               } else {
                  if (item?.condition === 1) {
                     setPriceAfterDiscount(tempPrice - vcDiscount)
                  } else {
                     let price = (tempPrice * vcDiscount) / 100
                     setPriceAfterDiscount(price)
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
               <p>Tiền tạm : {tempPrice}</p>
               <p>Tiền sau giảm : {priceAfterDiscount}</p>
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
