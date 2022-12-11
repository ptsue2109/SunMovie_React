import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { MovieApi } from "../../../service/MovieApi";
import { orderApi } from "../../../service/orders";
import { UserApi } from "../../../service/userApi";
import { RiMovie2Fill, RiUserLine } from "react-icons/ri";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from "chart.js";
import Topmovie from "./Topmovie";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {};

const Dashboard = (props: Props) => {
  const [totalMovie, setTotalMovie] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPost, setTotalPost] = useState(0);
  const [dataOrders, setDataOrder] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        // phim
        const { data: movies, status: mStatus } = await MovieApi.getAll();
        if (mStatus == 200) setTotalMovie(movies?.length);

        // thống kê user
        const { status, data } = await UserApi.getAll();
        if (status == 200) setTotalUser(data?.length);

        // order
        const { data: orderData, status: orderStatus } =
          await orderApi.getAllOrder();
        setDataOrder(orderData);
        if (orderStatus == 200) setTotalPost(orderData?.length);
      } catch (error) {
        return error;
      }
    })();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div className="flex items-center p-3 justify-center bg-white rounded-md text-[#b5b5c3]">
          <RiMovie2Fill className="w-10 h-10 px-1" />
          <div className="text-center">
            <span className="block text-black font-semibold">{totalMovie}</span>
            <span className="text-sm font-semibold">
              Top phim có nhiều người xem nhiều nhất
            </span>
          </div>
        </div>
        <div className="flex items-center p-3 justify-center bg-white rounded-md text-[#b5b5c3]">
          <RiUserLine className="w-10 h-10 px-1" />
          <div className="text-center">
            <span className="block text-black font-semibold">{totalUser}</span>
            <span className="text-sm font-semibold">Số tài khoản hiện có</span>
          </div>
        </div>
        <div className="flex items-center p-3 justify-center bg-white rounded-md text-[#b5b5c3]">
          <div>
            <FontAwesomeIcon icon={faShoppingCart} className="w-10 h-10 px-1" />
          </div>

          <div className="text-center">
            <span className="block text-black font-semibold">{totalPost}</span>
            <span className="text-sm font-semibold">Tổng đơn đặt hàng</span>
          </div>
        </div>
      </div>
      <Topmovie />
    </>
  );
};

export default Dashboard;
