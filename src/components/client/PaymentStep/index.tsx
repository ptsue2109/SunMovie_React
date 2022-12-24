import { FormEvent, useState } from "react"
import { useMultistepForm } from "./useMultistepForm"
import ChooseCombo from "../ChooseCombo"
import Payment from "../../../pages/client/payment/Payment"
import { Statistic } from "antd"
const {Countdown} = Statistic
const PaymentStep = () => {
  const [data, setData] = useState<any>();

  console.log("dataAtPaymetStep", data);

  const updateFields = (fields: Partial<FormData>) => {
    console.log("fieldsAtPaymetStep", fields);

    setData((prev: any) => {
      return { ...prev, ...fields }
    })
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <ChooseCombo {...data} updateFields={updateFields} />,
      <Payment {...data} updateFields={updateFields} />,
    ])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isLastStep) return next()
    alert("Successful Account Creation")
  }
  const RenderC= () => {
    return (
      <>
      <div className="container">
     
        <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "flex-end",
          }}
        >
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}
          <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
        </div>
   
    </div>
      </>
    )
  }

  return (
    <>
    <Countdown
        title="Đơn hàng sẽ hủy sau"
        value={Date.now() + 1000 * 60 * 9}

      // onChange={onChange}
      />
      <RenderC />
      </>
  )
}

export default PaymentStep
