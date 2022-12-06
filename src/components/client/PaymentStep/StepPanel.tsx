import React, { useState } from "react";
import { Button, Steps } from "antd";


type Props = {
   steps:any
};
const StepPanel = ({steps}: Props) => {
   const [activeStep, setActiveStep] = useState(0);

   function next() {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
   }

   function prev() {
      const prevStep = activeStep - 1;
      setActiveStep(prevStep);
   }

   return (
      <>
         <Steps current={activeStep} style={{ width: 400 }}>
            {steps.map((item: any) => (
               <Steps.Step key={item.title} title={item.title} />
            ))}
         </Steps>
         <div className="steps-content">{steps[activeStep].content}</div>
         <div className="steps-action">
            {activeStep < steps.length - 1 && (
               <Button type="primary" onClick={() => next()}>
                  Next
               </Button>
            )}
            {activeStep === steps.length - 1 && (
               <Button type="primary" htmlType="submit">
                  Submit
               </Button>
            )}
            {activeStep > 0 && (
               <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                  Previous
               </Button>
            )}
         </div>
      </>
   );
};

export default StepPanel
