import React from "react";
import { Statistic } from "antd";
type Props = {
  deadline:any
};
const { Countdown } = Statistic;

const CountdownComp = ({deadline}: Props) => {

  const onFinish = () => {
    console.log("finished!");
  };

  const onChange = (val: any) => {
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
