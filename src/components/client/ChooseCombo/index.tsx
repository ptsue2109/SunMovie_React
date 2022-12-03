import React, { useState } from 'react'
import { useAppSelector } from '../../../redux/hook'
import { Button, message, Steps } from 'antd';
import styled from 'styled-components';
import Payment from '../../../pages/client/payment/Payment';
import BookChair from '../../../pages/client/bookChair/BookChair';
import MovieDetail from '../../../pages/client/movieDetail/MovieDetail';
type Props = {}
const description = 'This is a description.';
const { Step } = Steps;
const steps = [
   {
      title: 'Thanh toán',
      components: <Payment />
   },
];
const ChooseCombo = (props: Props) => {
   const { food } = useAppSelector((state) => state.food);
   console.log(food);
   const [current, setCurrent] = useState(0);
   const next = () => {
      setCurrent(current + 1);
   };

   const prev = () => {
      setCurrent(current - 1);
   };
   const items = steps.map(item => ({ key: item.title, title: item.title }));
   return (
      <div className='bg-[#182b47] '>
         <Steps current={current} items={items} />
         <StepContent>{steps[current].components}</StepContent>
         <StepBtn>
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
         </StepBtn>
      </div>
   )
}

export default ChooseCombo;
const StepContent = styled.div`
   /* padding-top: 80px;
   text-align: center; */
   border: 1px dashed #e9e9e9;
   border-radius: 2px;
`
const StepBtn = styled.div`
     margin-top: 24px;
`
