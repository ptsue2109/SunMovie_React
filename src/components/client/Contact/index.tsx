import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";

type Props = {}

const Contact = (props: Props) => {
  const navigate = useNavigate();
  const { webConfigs } = useAppSelector((state) => state.WebConfigReducer);
  let logo = webConfigs[0]?.logo[0]?.url

 
  return (
    <section className="container max-w-6xl px-3 mx-auto  mt-8 justify-center h-[550px] ">
      <div className="mx-auto my-0 flex justify-center h-full items-center bg-[#182b47] rounded-md flex-col" >
        <h1 className="font-bold text-gray-600 text-4xl uppercase">{webConfigs[0]?.storeName}</h1>
        <img src={logo} alt="" className="w-[250px] max-w-[250px] h-[150px] max-h-[150px]" />
        Contact
      </div>
    </section>
  )
}

export default Contact