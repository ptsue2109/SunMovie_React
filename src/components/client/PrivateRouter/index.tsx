import { notification } from "antd";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import { useAppSelector } from "../../../redux/hook";

type PrivateRouteProps = {
   children: JSX.Element;
   acceptRole: number;
};
/* userInfo
   + status : 
            0 : chưa xác thực
            1 : Đã xác thực
            2 : Đã khóa
   + Role :
            0 : user
            1 : admin
*/

const PrivateRoute = ({ children, acceptRole }: PrivateRouteProps) => {
   const navigate = useNavigate()
   const { isLogged, currentUser } = useAppSelector((state) => state.authReducer);
   const { users } = useAppSelector((state: any) => state.userReducer);
   const userLogin = users?.find((item: any) => item?._id == currentUser?._id);
   useEffect(() => {
      if (isLogged === false) {
         notification.info({ message: 'Đăng nhập trước khi thực hiện chức năng này' });

      } else if (isLogged && (userLogin?.status !== 1)) {
         notification.info({ message: 'Tài khoản của bạn đã bị khóa hoặc chưa được xác thực , hãy liên hệ với quản trị viên !!' });
         setTimeout(() => { navigate(configRoute.routes.contact) }, 2000);

      } else if (isLogged && userLogin?.status === 1 && userLogin?.role !== 1) {
         navigate(configRoute.routes.home)
         notification.info({ message: 'Hãy đăng nhập với tư cách quản trị viên !!' });
      }
      else{
         return
      }
   }, []);

   if (!isLogged) {
      
      return (<Navigate to={configRoute.routes.signin} />);
   }
   else if (isLogged && (userLogin?.status !==1)) {
      return (<React.Fragment> </React.Fragment>)
   } else if (isLogged && userLogin?.status === 1 && userLogin?.role !== 1) {
      return (
         <Navigate to={configRoute.routes.dashboard} />
      )
   }
   else if (isLogged && userLogin?.status === 1 && (userLogin?.role !== acceptRole)) {
      return (<React.Fragment> </React.Fragment>)
   }
   return children;
};

export default PrivateRoute;