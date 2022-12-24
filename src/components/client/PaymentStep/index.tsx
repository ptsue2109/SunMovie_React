import React, { useState, useEffect } from "react";
import CountdownComp from "../Countdown";
import { convertDateToNumber, convertMovieTime } from "../../../ultils";
import moment from "moment";
import ChooseCombo from "../ChooseCombo";
import Payment from "../../../pages/client/payment/Payment";
import { Button, Steps, message } from "antd";

type Props = {
   nextStep: any;
   children: any;
   rightContent: any;
   name: any;
   time?: any;
};
const PaymentStep = ({
   nextStep,
   children,
   rightContent,
   name,
   time,
}: Props) => {
   let deadline = Date.now() + 1000 * 60 * 9;
   const [timer, setTimer] = useState<any>();
   const [current, setCurrent] = useState(0);

   const next = () => {
      setCurrent(current + 1);
   };

   const prev = () => {
      setCurrent(current - 1);
   };
   const steps = [
      {
         title: "First",
      },
      {
         title: "Last",
      },
   ];
   const items = steps.map((item) => ({ key: item.title, title: item.title }));
   const getTimeCountdown = (val: any) => { };

   const RenderStep = () => {
      return (
         <>
            <div className="flex flex-row justify-center mt-16 ">
               <div className="w-[75%]">
                  <div className="bg-[#f6710d] h-[680px] ">
                     <div className="flex items-center justify-between p-2">
                        <h1 className="text-3xl p-3 text-white ">
                           {name}
                        </h1>
                        <div className="">
                          
                        </div>
                     </div>
                     {children}

                  </div>
               </div>
               <div className="w-[25%] bg-white ml-10 h-[680px] ">
                  {rightContent}
               </div>
            </div>
            {current < steps.length - 1 && (
               <Button type="primary" onClick={() => next()}>
                  Next
               </Button>
            )}
            {current === steps.length - 1 && (
               <Button
                  type="primary"
                  onClick={() => message.success("Processing complete!")}
               >
                  Done
               </Button>
            )}
            {current > 0 && (
               <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                  Previous
               </Button>
            )}
         </>
      );
   };

   return (
      <div className=" bg-[#182b47] container">
         <CountdownComp deadline={deadline} onChange={getTimeCountdown} />
         <RenderStep />
      </div>
   );
};

export default PaymentStep;
