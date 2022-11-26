import { message, notification, Spin } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import { useAppSelector } from "../../../redux/hook";
import { AuthApi } from "../../../service/authApi";
import Contact from "../Contact";

type PrivateRouteProps = {
   children: JSX.Element;
   acceptRole: number;
};

const PrivateRoute = ({ children, acceptRole }: PrivateRouteProps) => {
   const navigate = useNavigate()
   const { isLogged, currentUser } = useAppSelector((state) => state.authReducer);
   const { users } = useAppSelector((state: any) => state.userReducer);
   const userLogin = users?.find((item: any) => item?._id == currentUser?._id);

   useEffect(() => {
      if (isLogged === false) {
         notification.info({ message: 'Đăng nhập trước khi thực hiện chức năng này' });
      } else if (isLogged && (userLogin?.status === 3 || userLogin?.status === 0)) {
         notification.info({ message: 'Tài khoản của bạn đã bị khóa hoặc chưa đươck xác thực , hãy liên hệ với quản trị viên !!' });
         setTimeout(() => {
            navigate(configRoute.routes.contact)
         }, 2000);
      } else { }
   }, [])
   if (!isLogged) {
      return (<Navigate to={configRoute.routes.signin} />);
   }
   else if (isLogged && (userLogin?.status === 3 || userLogin?.status === 0)) {
      return (<Spin className="w-[100vw] h-[100vh] flex items-center justify-center" size="large"></Spin>)
   } else if (isLogged && userLogin?.status === 3 && userLogin?.role === 1) {
      return (<Spin className="w-[100vw] h-[100vh] flex items-center justify-center" size="large"></Spin>)
   }
   return children;
};

export default PrivateRoute;