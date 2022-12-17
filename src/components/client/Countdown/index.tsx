import React from "react";
import { Statistic } from "antd";
import { useNavigate } from "react-router-dom";
import configRoute from "../../../config";
type Props = {
  deadline: any,
  info?: any
};
const { Countdown } = Statistic;

const CountdownComp = ({ deadline, info }: Props) => {
  const navigate = useNavigate()
  const onFinish = () => {
    navigate(`${configRoute.routes.cancelOrder}`, { state: info })
  };

  const onChange = (val: any) => {
    localStorage.setItem('timer', val)
  };
  return (
    <div className="p-2 text-white">
      <Countdown
        title="Đơn hàng sẽ hủy sau"
        value={deadline}
        onFinish={onFinish}
        onChange={onChange}
      />
    </div>
  );
};

export default CountdownComp;
