import { message, notification, Spin } from "antd";
import React, { useEffect, useState } from "react";
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
         setTimeout(() => { navigate(configRoute.routes.contact) }, 2000);

      } else if (isLogged && userLogin?.status === 3 && userLogin?.role !== acceptRole) {
         navigate(configRoute.routes.home)
         notification.info({ message: 'Hãy đăng nhập với tư cách quản trị viên !!' });
      }
   }, []);

   if (!isLogged) {
      return (<Navigate to={configRoute.routes.signin} />);
   }
   else if (isLogged && (userLogin?.status === 3 || userLogin?.status === 0)) {
      return (<React.Fragment> </React.Fragment>)
   } else if (isLogged && userLogin?.status === 3 && userLogin?.role === 1) {
      return (
         <Navigate to={configRoute.routes.dashboard} />
      )
   }
   else if (isLogged && userLogin?.status === 3 && (userLogin?.role !== acceptRole )) {
      return (<React.Fragment> </React.Fragment>)
   }
   return children;
};

export default PrivateRoute;