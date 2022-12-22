import { Button, message, Statistic, Steps } from 'antd';
import React, { useState, useEffect } from "react";
import BookChair from '../../../pages/client/bookChair/BookChair';
import ChooseCombo from '../ChooseCombo';
import Payment from '../../../pages/client/payment/Payment';
import CountdownComp from '../Countdown';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hook';
type Props = {

}
const { Countdown } = Statistic;

const StepC = ({ }: Props) => {
  const [data, setData] = useState<any>()
  const steps = [
    {
      title: 'Firsst',
      component: <ChooseCombo />,
    },
    {
      title: 'Last',
      component: <Payment />,
    },
  ];
  const [current, setCurrent] = useState(0);
  const dispatch = useAppDispatch()
  const next = () => {
    setCurrent(current + 1);
    handle()
  };
  const handle = () => {
    console.log("213123");

  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map(item => ({ key: item.title, title: item.title }));
  let deadline = Date.now() + 1000 * 60 * 9;

  const getTimeCountdown = (val: any) => {

  }
  const navigate = useNavigate()
  // const onFinish = () => {
  //   navigate(`/cancel`, { state: info })
  // };
  const [timer, setTimer] = useState<any>()
  useEffect(() => {
    if (deadline) {
      setTimer(deadline)
    }
  }, [])

  const RenderStep = () => {
    return (
      <>
        <Steps current={current} items={items} />
        <div>{steps[current].component}</div>
        <div>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </>
    )
  }
  return (
    <div className='bg-[#182b47] rounded-md container p-3' >
      <div className="text-white" style={{ top: 250, right: '33%', position: "absolute" }}>
        <Countdown
          title="Đơn hàng sẽ hủy sau"
          value={timer}
        // onFinish={onFinish}
        // onChange={onChange}
        />
      </div>

      <RenderStep />

    </div>
  )
}

export default StepC