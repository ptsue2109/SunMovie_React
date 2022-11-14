
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRoutes, useSearchParams } from "react-router-dom";
import { Button, Form, message } from "antd";
import { AuthApi } from "../../../service/authApi";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { getUsers, updateUser } from "../../../redux/slice/userSlice";
import { UserApi } from "../../../service/userApi";
const Complete = () => {
   const dispacth = useAppDispatch()
   const [searchParams, setSearchParams] = useSearchParams();
   const token = searchParams.get('token')
   const clickBtn = () => {
      AuthApi.createOrUpdateUser(token as any, {status: 1}).then((result) => {
        console.log('result', result);
        
       });
   }

   return (
      <section className="container max-w-6xl px-3 mx-auto  mt-8 justify-center h-[550px]">
         <h1 className="text-gray-600 font-bold text-4xl">Xác thực tài khoản</h1>
         <Button onClick={clickBtn}>bấm vào đây để xác thực </Button>
      </section>
   );
};

export default Complete;
