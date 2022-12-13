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
import MonthRevenue from "./MonthRevenue";
import { getdashBoard } from "../../../redux/slice/DashBoard";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getTicketDetails } from "../../../redux/slice/TicketDetailSlice";
import CripTicketFood from "./CripTicketFood";
import { formatCurrency } from "../../../ultils";
import YearRevenue from "./YearRevenue";

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
  const [active, setActive] = useState(0);
  const dispatch = useAppDispatch();
  const { dashboard } = useAppSelector((state) => state.DashboardReducer);
  const { ticketDetails } = useAppSelector(
    (state) => state.TicketDetailReducer
  );

  const onToggle = (number: number) => {
    setActive(number);
  };
  // let count = 0;
  // const countTicket = ticketDetails.filter((item: any) => !item.expireAt);
  // countTicket?.map((item: any, index: number) => (count = index + 1));
  useEffect(() => {
    document.title = "DashBoard";
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
  useEffect(() => {
    dispatch(getTicketDetails());
    dispatch(getdashBoard());
  }, [dispatch]);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <div className="flex items-center p-3 justify-center bg-white rounded-md text-[#b5b5c3]">
          {/* <RiUserLine className="w-10 h-10 px-1" /> */}
          <div className="text-center">
            <span className="block text-black font-semibold">
              {dashboard.length !== 0
                ? formatCurrency(dashboard?.weekProfit[0]?.weekTotal)
                : ""}
            </span>
            <span className="text-sm font-semibold">Doanh thu tuần</span>
          </div>
        </div>
        <div className="flex items-center p-3 justify-center bg-white rounded-md text-[#b5b5c3]">
          {/* <RiMovie2Fill className="w-10 h-10 px-1" /> */}
          <div className="text-center">
            <span className="block text-black font-semibold">
              {dashboard.length !== 0
                ? formatCurrency(dashboard?.monthProfit[0]?.mothTotal)
                : ""}
            </span>
            <span className="text-sm font-semibold">Doanh thu tháng này</span>
          </div>
        </div>
        <div className="flex items-center p-3 justify-center bg-white rounded-md text-[#b5b5c3]">
          {/* <RiUserLine className="w-10 h-10 px-1" /> */}
          <div className="text-center">
            <span className="block text-black font-semibold">
              {dashboard.length !== 0
                ? formatCurrency(dashboard?.yearProfit[0]?.yearTotal)
                : ""}
            </span>
            <span className="text-sm font-semibold">Doanh thu năm nay</span>
          </div>
        </div>
        <div className="flex items-center p-3 justify-center bg-white rounded-md text-[#b5b5c3]">
          <div>
               {/* @ts-ignore */}
            <FontAwesomeIcon icon={faShoppingCart} className="w-10 h-10 px-1" />
          </div>

          <div className="text-center">
            <span className="block text-black font-semibold">{totalPost}</span>
            <span className="text-sm font-semibold">Tổng đơn đặt hàng</span>
          </div>
        </div>
      </div>
      <div className="my-10 ml-8">
        <button
          onClick={() => onToggle(1)}
          className={
            active == 1
              ? "px-7 bg-green-600 text-white h-[50px] mx-2 rounded"
              : "px-7 border border-green-600 text-green-600 h-[50px] mx-2 rounded"
          }
        >
          Doanh thu của rạp theo tháng
        </button>
        <button
          onClick={() => onToggle(2)}
          className={
            active == 2
              ? "px-7 bg-green-600 text-white h-[50px] mx-2 rounded"
              : "px-7 border border-green-600 text-green-600 h-[50px] mx-2 rounded"
          }
        >
          Doanh thu của rạp theo năm
        </button>
        <button
          onClick={() => onToggle(3)}
          className={
            active == 3
              ? "px-7 bg-green-600 text-white h-[50px] mx-2 rounded"
              : "px-7 border border-green-600 text-green-600 h-[50px] mx-2 rounded"
          }
        >
          Doanh thu phim
        </button>
        <button
          onClick={() => onToggle(4)}
          className={
            active == 4
              ? "px-7 bg-green-600 text-white h-[50px] mx-2 rounded"
              : "px-7 border border-green-600 text-green-600 h-[50px] mx-2 rounded"
          }
        >
          Doanh thu vé, đồ ăn của rạp
        </button>
      </div>
      <div className={active == 1 ? "" : "hidden"}>
        <MonthRevenue />
      </div>
      <div className={active == 2 ? "" : "hidden"}>
        <YearRevenue />
      </div>
      <div className={active == 3 ? "" : "hidden"}>
        <Topmovie />
      </div>
      <div className={active == 4 ? "" : "hidden"}>
        <CripTicketFood />
      </div>
    </>
  );
};

export default Dashboard;
