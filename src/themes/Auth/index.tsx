import React, { useEffect, useState } from "react";
import configRoute from "../../config";
import { useAppSelector } from "../../redux/hook";
import { Link } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

const AuthCore = ({ children }: Props) => {
  const { webConfigs } = useAppSelector((state: any) => state.WebConfigReducer);
  return (
    <section className="container max-w-6xl px-3 mx-auto justify-center h-[550px] sm:h-auto border border-solid border-gray-600 shadow-lg rounded-md">
      <div className="w-full h-full">
        <div className="grid lg:grid-cols-2  sm:grid sm:grid-cols-1">
          <div className=" w-[608px] p-[30px] sm:place-items-center">
            <div className="font-[800] text-[21.5px]  leading-[27px] mb-[10px] pl-4">
              <Link to={configRoute.routes.home}>
                <h1 className="text-center font-bold text-[30px]  opacity-1 uppercase">{webConfigs[0]?.storeName}</h1>
              </Link>
              <h3>Cuộc sống hàng ngày dễ chịu, niềm vui hàng ngày</h3>
            </div>
            <div className=" font-[400] text-[14px] leading-[20px] text-[#949494]  mb-[80px] pl-4">
              <p>
                Sử dụng các hàng hóa và dịch vụ nhân vật khác nhau của {webConfigs[0]?.storeName} <br />
                với tài khoản {webConfigs[0]?.storeName} Friends của bạn!
              </p>
            </div>
            <div className=" flex w-full justify-center ">
              <img src={webConfigs[0]?.logo[0]?.url} className="max-w-[350px] h-[296px] align-middle" />
            </div>
          </div>
          <div className="auth-right w-auto p-[30px] ml-4 ">
            <div className="auth-right__main">{children}</div>
            <div className="divider text-center font-bold">OR</div>
            <div className="mb-3">
              <button className="bg-gray-600 w-full p-1">Đăng nhập với google</button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>

  );
};

export default AuthCore;
