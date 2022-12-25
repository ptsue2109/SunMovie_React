import { Button, message, Statistic, Steps } from 'antd';
import React, { useState, useEffect } from "react";
import BookChair from '../../../pages/client/bookChair/BookChair';
import ChooseCombo from '../ChooseCombo';
import Payment from '../../../pages/client/payment/Payment';
import CountdownComp from '../Countdown';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hook';
import { createFD } from '../../../redux/slice/FoodDetail';

type Props = {

}
const { Countdown } = Statistic;

const StepC = ({ }: Props) => {
  const [data, setData] = useState<any>([]);
  const [foodData, setFoodData] = useState<any>([]);
  const [foodData2, setFoodData2] = useState<any>([]);
  useEffect(() => {
    saveFoodData()
    if (foodData) {
      setFoodData2(foodData)
    }
  }, [])
  const updateFieldsFood = (fields: any) => {
    localStorage.setItem("fields", JSON.stringify({ food: fields })
    );
  }

  const updateFields = (fields: any) => {
    // console.log(fields);
  }

  const saveFoodData = () => {
    let a = JSON.parse(localStorage.getItem("fields") as any);
    setFoodData(a);

  };

  const steps = [
    {
      title: 'Firsst',
      comp: <ChooseCombo {...data} updateFieldsFood={updateFieldsFood} />

    },
    {
      title: 'Last',
      comp: <Payment {...data} updateFields={updateFields} foodData={foodData} />
    },
  ];
  const [current, setCurrent] = useState(0);
  const dispatch = useAppDispatch()
  const next = () => {
    setCurrent(current + 1);
    saveFoodData()
  };


  const prev = () => {
    setCurrent(current - 1);
    saveFoodData()
  };
  const items = steps.map(item => ({ key: item.title, title: item.title }));
  let deadline = Date.now() + 1000 * 60 * 9;

  const getTimeCountdown = (val: any) => {

  }
  const navigate = useNavigate()
  const onFinish = () => {
    navigate(`/cancel`, { state: [] })
  };
  const [timer, setTimer] = useState<any>()
  useEffect(() => {
    if (deadline) {
      setTimer(deadline)
    }
  }, [])

  const RenderStep = () => {
    return (
      <>
        <div>{steps[current].comp}</div>
        <div>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              Next
            </Button>
          )}
          {/* {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )} */}
        </div>
      </>
    )
  }
  const onChange = (val: any) => {
    // console.log("val", val);

  }
  return (
    <div className='bg-[#182b47] rounded-md container p-3' >
      <div  >
        <Countdown
          title={<span className="text-white">Đơn hàng sẽ hủy sau</span>}
          value={timer}
          valueStyle={{ "color": "white" }}
          onFinish={onFinish}
          onChange={onChange}
        />
      </div>

      <RenderStep />

    </div>
  )
}

export default StepC