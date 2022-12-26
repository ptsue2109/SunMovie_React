import { DatePicker } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useAppSelector } from "../../../redux/hook";
import { convertDateToNumber, formatCurrency } from "../../../ultils";

type Props = {};

const StatisticsOverTime = (props: Props) => {
  let { orders } = useAppSelector((state: any) => state.OrderReducer);
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [total, setTotal] = useState(0);
  let a = 0;
  orders = orders.filter((item: any) => item.status == 1 || item.status == 3);

  const { RangePicker } = DatePicker;
  const onChangeDate = (_: any, dateStrings: any) => {
    setDateStart(dateStrings[0]);
    setDateEnd(dateStrings[1]);
    let order = orders.filter(
      (item: any) =>
        convertDateToNumber(item?.createdAt) >=
          convertDateToNumber(dateStrings[0]) &&
        convertDateToNumber(item?.createdAt) <=
          convertDateToNumber(dateStrings[1])
      // moment(item?.createdAt).unix() >= moment(dateStrings[0]).unix() &&
      // moment(item?.createdAt).unix() <= moment(dateStrings[1]).unix()
    );
    a = order.reduce((a: any, b: any) => {
      return a + b.totalPrice;
    }, 0);
    setTotal(a);
  };

  return (
    <>
      <div className="min-h-[200px] my-20">
        <div className=" text-center">
          <p className="text-xl font-bold">
            Chọn khoảng thời gian cần thống kê:
          </p>
          <RangePicker onChange={onChangeDate} />
        </div>
        {dateStart && (
          <div className="text-center py-10 text-xl">
            Doanh thu từ ngày "{dateStart}" đến ngày "{dateEnd}":{" "}
            <span className="text-2xl text-red-600">
              {formatCurrency(total)}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default StatisticsOverTime;
