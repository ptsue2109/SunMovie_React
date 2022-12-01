import { Button, Form, Input, message, Select, Steps } from "antd";
import style from "./Payment.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import React, { useState, useEffect } from "react";
import { discountPercent, formatCurrency, formatDate, formatDateString, formatTime } from "../../../ultils";
import { isFuture, isPast, parseISO } from "date-fns";
import { banks } from "../../../ultils/data";
import { validateMessages } from "../../../ultils/FormMessage";
import { createOrder, createPaymeny } from "../../../redux/slice/OrdersSlice";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getticketDetailById } from "../../../redux/slice/ticketSlice";

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 12 },
};

type Props = {};

const Payment = (props: Props) => {
  document.title = "Payment";
  const [searchParams, setSearchParams] = useSearchParams();
  let id = searchParams.get("id");

  const { webConfigs } = useAppSelector((state: any) => state.WebConfigReducer);
  const { currentUser } = useAppSelector((state: any) => state.authReducer);
  const [tempPrice, setTempPrice] = useState<any>()
  const [voucherMess, setVoucherMess] = useState<any>("");
  const { vouchers } = useAppSelector((state: any) => state.voucherReducer);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState<number>();
  const [CODE, setCODE] = useState<any>('');
  const [data, setData] = useState<any>([]);
  const [info, setInfo] = useState<any>();
  const [room, setRoom] = useState<any>();
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(getticketDetailById(id));
      console.log(payload);
      setData(payload?.ticketDetail)
      setInfo(payload?.ticketDetail[0]);
      setTempPrice(payload?.ticketId?.totalPrice);
      setPriceAfterDiscount(payload?.ticketId?.totalPrice)
    })();
  }, [id]);
  const upperText = (text: any) => { return text.toUpperCase() };

  useEffect(() => {
    form.setFieldsValue({
      username: currentUser?.fullname ?? currentUser?.username,
      email: currentUser?.email,
      phone: currentUser?.phone,
      paymentType: '',
      voucherCode: ''
    });
  }, []);

  const checkCode = (codeVal: any) => {
    if (codeVal.length >= 1) {
      setCODE(codeVal)
    } else {
      setCODE("")
      setVoucherMess("")
      setPriceAfterDiscount(tempPrice)
    }
  };

  const onFinish = (val: any) => {
    let payload = {
      userId: currentUser?._id,
      ticketId: id,
      totalPrice: priceAfterDiscount,
      bankCode: val.paymentType,
      orderDescription: "thanh toan",
      orderType: "billpayment",
      language: ""
    }

    dispatch(createPaymeny(payload)).unwrap()
      .then((res: any) => {
        window.location.href = `${res}`
      })

    .catch((err: any) => console.log(err))

  }

  const handle = () => {
    if (CODE) {
      let upper = upperText(CODE);
      let item = vouchers.find((item: any) => item?.code === upper);
      console.log('item', item);
      if (item === undefined) {
        setVoucherMess("Không tìm thấy mã voucher");
      } else if (isPast(parseISO(item?.timeEnd))) {
        setVoucherMess("Voucher đã hết hạn sử dụng");
      } else if (isFuture(parseISO(item?.timeStart))) {
        setVoucherMess(`Voucher áp dụng từ ngày ${formatDate(item?.timeStart)}`);
      } else if (item?.userId) {
        if (item?.userId?.map((a: any) => a?._id === currentUser?._id)) {
          setVoucherMess(`Bạn đã sử dụng voucher này rồi`);
        }
      }
      else {
        let vcDiscount = item?.conditionNumber;
        let vcValue = item?.voucherVal; // tiền tối thiểu để giảm
        if (tempPrice < vcValue) {
          setVoucherMess("Hóa đơn chưa đủ điều kiện để giảm");
        } else {
          if (item?.condition === 1) {
            setPriceAfterDiscount(Number(tempPrice) - Number(vcDiscount));
            console.log('priceAfterDiscount', priceAfterDiscount);
          } else {
            let price: any = discountPercent(tempPrice, vcDiscount)
            setPriceAfterDiscount(price);
          }
        }

        setVoucherMess("")
      }
    } else {
      setVoucherMess("")
      setPriceAfterDiscount(tempPrice)
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
              <Form.Item name="paymentType" label="Hình thức thanh toán" rules={[{ required: true }]} >
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

              <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, whitespace: true, len: 10 }]}>
                <Input />
              </Form.Item>

              <div className="">
                <Form.Item name="voucherCode" label="Mã giảm giá" >
                  <Input onChange={(e: any) => checkCode(e?.target?.value)} />
                </Form.Item>
                <small className="text-danger ml-[170px]">{voucherMess}</small>
              </div>
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
            <b>Rạp</b>: {webConfigs[0]?.storeName} | RAP {info ? (<>{info?.roomId?.name}</>) : ""}
          </li>
          <li className="border-b-2 border-dotted border-black leading-10">
            <b>Suất chiếu</b>:  {formatTime(info?.showTimeId?.startAt)} |  {formatDateString(info?.showTimeId?.date)}
          </li>
          <li className="border-b-2 border-dotted border-black leading-10">
            <b>Combo</b>:{" "}
          </li>
          <li className="border-b-2 border-dotted border-black leading-10">
            <b>Ghế</b>: {data && data?.map((item: any) => (
              <span key={item?._id}>{item?.seatId?.row}{item?.seatId?.column},</span>
            ))}
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
          {priceAfterDiscount ? (
            <>
              <span className="font-semibold text-xl text-[#f6710d]">
                {formatCurrency(priceAfterDiscount)}
              </span>
            </>
          ) : (
            <>
              <span className="font-semibold text-xl text-[#f6710d]">
                {formatCurrency(tempPrice)}
              </span>
            </>
          )}
        </h2>
      </div>
    </div>
  );
};

export default Payment;
