import { message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hook";
import { getCurrentUser } from "../../../redux/slice/AuthSlice";


type Props = {};

const LoadingPushAccountInLocalStorage = (props: Props) => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   dispatch(getCurrentUser({})).unwrap()
      .then((payload: any) => {
         message.success("Đăng Nhập thành công")
         navigate('/')
      })
      .catch((err: any) => console.log(err)
      )
   return (
      <Spin size="large" />
   )
};

export default LoadingPushAccountInLocalStorage;
