import React from "react";
import { PageHeader, Form, Input, Steps } from "antd";
import StepPanel from "./StepPanel";
import Payment from "../../../pages/client/payment/Payment";

type Props = {};
const { Step } = Steps;

const PaymentStep = (props: Props) => {
   const [stepForm] = Form.useForm();

   const Step1Form = () => {
      return (
         <>
            <Form.Item name="field1" label="Field1">
               <Input />
            </Form.Item>
         </>
      );
   };

  
   const onFinish = (fieldsValue: any) => {
      let a = stepForm.getFieldValue([]);
      console.log(a);
   };
   const steps = [
      {
         title: "Step1",
         content: <Step1Form />,
      },
      
   ];
   return (
      <section className="container max-w-6xl px-3 mx-auto  mt-8 justify-center h-[550px] ">
         <div className="mx-auto my-0 flex  h-full  bg-[#182b47] rounded-md flex-col" >
            <PageHeader title="Step Form" subTitle="Multi-Step form">
               <Form form={stepForm} onFinish={onFinish}>
                  <StepPanel steps={steps} />
               </Form>
            </PageHeader>
         </div>
      </section>


   );
};

export default PaymentStep;
