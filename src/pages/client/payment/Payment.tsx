import { Button, Form, Input, Select } from "antd";
import style from "./Payment.module.scss";
import { useAppSelector } from "../../../redux/hook";
import React, { useState, useEffect } from "react";
import { discountPercent, formatCurrency, formatDate } from "../../../ultils";
import { isFuture, isPast, parseISO } from "date-fns";
import { banks } from "../../../ultils/data";
import { validateMessages } from "../../../ultils/FormMessage";
const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 12 },
};

type Props = {};

const Payment = (props: Props) => {
  document.title = "Payment"
  const [form] = Form.useForm()
  const { webConfigs } = useAppSelector((state) => state.WebConfigReducer);
  const { currentUser } = useAppSelector((state) => state.authReducer);
  const [tempPrice, setTempPrice] = useState<number>(3242343000)
  const [voucherMess, setVoucherMess] = useState("");
  const { vouchers } = useAppSelector((state: any) => state.voucherReducer);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState<number>(0);
  const [CODE, setCODE] = useState('');

  const upperText = (text: any) => {
    return text.toUpperCase();
  };
  
  form.setFieldsValue({
    username: currentUser?.fullname ?? currentUser?.username,
    email: currentUser?.email,
    phone: currentUser?.phone,
    paymentType: '',
    discountCode: ''
  });

  const checkCode = (codeVal: any) => {
    if (codeVal.length > 0) {
      setCODE(codeVal)
    } else {
      setCODE(CODE)
      setPriceAfterDiscount(tempPrice)
    }
  };
  const onFinish = (val: any) => {
    console.log(val);

  }
  const handle = () => {
    if (CODE) {
      let upper = upperText(CODE);
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
        let vcValue = item?.voucherVal; // tiền tối thiểu để giảm
        if (item?.voucherKey === "hóa đơn") {
          if (tempPrice < vcValue) {
            setVoucherMess("Hóa đơn chưa đủ điều kiện để giảm");
          } else {
            if (item?.condition === 1) {
              setPriceAfterDiscount(tempPrice - vcDiscount);
            } else {
              let price: any = discountPercent(tempPrice, vcDiscount)
              setPriceAfterDiscount(price);
            }
          }
        }
        setVoucherMess("")
      }
    } else {
      setVoucherMess("")
    }

  }
  return (
    <div className="flex flex-row justify-center mt-16 ">
      <div className="w-[55%]">
        <div className="bg-[#f6710d] h-[650px] ">
          <h1 className="text-3xl p-3 text-white ">VUI LÒNG THANH TOÁN</h1>
          <div className="bg-[#ffffff] h-[550px] w-[98%] mx-auto ">
            <Form
              {...layout}
              layout="horizontal"
              className="w-[67%] mx-auto pt-5"
              form={form}
              onFinish={onFinish}
              validateMessages={validateMessages}
            >
              <Form.Item name="paymentType" label="Hình thức thanh toán" >
                <Select placeholder="Chọn ngân hàng" allowClear>
                  {banks?.map((item, index: any) => (
                    <Select.Option key={index} value={item?.value}>
                      <div className="flex justify-between">
                        {item?.name}
                        <img src={item?.image} alt="" width="25px" height="25px" />
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="username" label="Họ và tên" rules={[{ required: true, min: 5, whitespace: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name="email" label="Email" rules={[{ required: true }]} >
                <Input disabled />
              </Form.Item>

              <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, type: 'string', whitespace: true, len: 10 }]}>
                <Input />
              </Form.Item>

              <Form.Item name="discountCode" label="Mã giảm giá" >
                <Input onChange={(e: any) => checkCode(e?.target?.value)} />
                <small className="text-danger" >{voucherMess}</small>
              </Form.Item>

              <div className=" w-[280px] justify-center flex flex-col ml-[160px]">
                <Button
                  onClick={handle}
                  style={{
                    width: "100%",
                    backgroundColor: "#f6710d",
                    border: "none",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  Áp dụng
                </Button>
                <p className="text-xs mt-2 ">
                  (*) Bằng việc click/chạm vào THANH TOÁN, bạn đã xác nhận hiểu
                  rõ các Quy Định Giao Dịch Trực Tuyến của {webConfigs[0]?.storeName}.
                </p>


                <div className="flex">
                  <Button
                    className={style.btn}
                    style={{
                      width: "47%",
                      backgroundColor: "#f6710d",
                      border: "none",
                    }}
                    type="primary"
                    htmlType="submit"
                  >
                    Quay lại
                  </Button>
                  <Button
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
                    Thanh toán
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="w-[20%] bg-white ml-10 h-[580px] ">
        <div className="w-[80%] mx-auto p-2">
          <img
            src="https://cdn.galaxycine.vn/media/2022/11/21/450x300_1668999445553.jpg"
            alt=""
          />
        </div>
        <h1 className="font-bold uppercase px-4 pt-2">ONE PIECE FILM RED</h1>
        <ul className="px-4 py-3">
          <li className="border-b-2 border-dotted border-black leading-10">
            <b>Rạp</b>: Galaxy Nguyễn Du | RAP 5{" "}
          </li>
          <li className="border-b-2 border-dotted border-black leading-10">
            <b>Suất chiếu</b>: 19:00 | Thứ sáu, 25/11/2022
          </li>
          <li className="border-b-2 border-dotted border-black leading-10">
            <b>Combo</b>:{" "}
          </li>
          <li className="border-b-2 border-dotted border-black leading-10">
            <b>Ghế</b>: H4
          </li>
        </ul>
        <h2 className="px-4 text-base">
          Tổng Giá:{" "}
          <span className="font-semibold text-xl text-[#dcdcd]">
            {formatCurrency(tempPrice)}
          </span>
        </h2>
        <h2 className="px-4 text-base">
          Tổng:{" "}
          <span className="font-semibold text-xl text-[#f6710d]">
            {formatCurrency(priceAfterDiscount)}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Payment;
