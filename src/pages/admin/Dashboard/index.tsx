import {
  faCheck,
  faMoneyCheck,
  faNewspaper,
  faShippingFast,
  faShoppingCart,
  faTimes,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { PostApi } from "../../../service/postApi";
import { MovieApi } from "../../../service/MovieApi";
import { UserApi } from "../../../service/userApi";
import {RiMovie2Fill, RiUserLine} from 'react-icons/ri'
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
import { Bar, Line } from "react-chartjs-2";
// import "./Dashboard.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "User đăng ký theo tháng",
    },
  },
};

const optionsLine = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Doanh thu hàng tháng",
    },
  },
};

const Dashboard = (props: Props) => {
  const [statOrder, setStatOrder] = useState<any[]>();
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalMovie, setTotalMovie] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPost, setTotalPost] = useState(0);
  const [statsUserSignup, setStatsUserSignup] = useState<any[]>();
  const [moneyMonth, setMoneyMonth] = useState<any[]>();

  const labels = Array.apply(null, new Array(12)).map((_, index) => `Tháng ${++index}`);
  const data = {
    labels,
    datasets: [
      {
        label: `Năm ${new Date().getFullYear()}`,
        data: labels.map((itemMonth) => {
          const month = +itemMonth.split(" ")[1];
          const getMonth = statsUserSignup?.find((item) => item.month === month);

          if (getMonth) {
            return getMonth.total;
          }
          return 0;
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const dataLine = {
    labels,
    datasets: [
      {
        label: `Năm ${new Date().getFullYear()}`,
        data: labels.map((itemMonth) => {
          const month = +itemMonth.split(" ")[1];
          const getMonth = moneyMonth?.find((item) => item.month === month);

          if (getMonth) {
            return getMonth.totalPrice;
          }
          return 0;
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  useEffect(() => {

    (async () => {
      try {
        // thống kê đơn hàng
        
        // const statsOrder = await .statsOrderByStatus();
        // setTotalOrder(() => {
        //   return statsOrder.payload.stats?.reduce((total: any, item: { total: any; }) => total + item.total, 0);
        // });
        // if (statsOrder.status) setStatOrder(statsOrder.payload.stats);

        // thống kê sp
        const  {data:movies, status:mStatus} = await MovieApi.getAll();
        if(mStatus == 200) setTotalMovie(movies?.length)

        // thống kê user
        const {status, data} = await UserApi.getAll();
        if(status == 200) setTotalUser(data?.length)
       
        // user đăng ký theo tháng
       

        // thống kê bài viết
        const {data:postData, status:postStatus} = await PostApi.getAll();
        if(postStatus == 200) setTotalPost(postData?.length)
        
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 mb-4 gap-4">
        {statOrder?.map((item, index) => (
          <div
            key={index}
            className={`bg-white p-3 rounded-md ${
              item.status === 0
                ? "order__card-item--new"
                : item.status === 1
                ? "order__card-item--verified"
                : item.status === 2
                ? "order__card-item--progress"
                : item.status === 3
                ? "order__card-item--success"
                : "order__card-item--cancel"
            }`}
          >
            <div className="">
              <div className="flex items-center justify-between">
                <div className="">
                  {item.status === 0 ? (
                    <FontAwesomeIcon icon={faShoppingCart} />
                  ) : item.status === 1 ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : item.status === 2 ? (
                    <FontAwesomeIcon icon={faShippingFast} />
                  ) : item.status === 3 ? (
                    <FontAwesomeIcon icon={faMoneyCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} />
                  )}
                </div>
                <div className="text-center">
                  <strong>{item.total}</strong>
                  <p className="font-semibold text-sm">{item.statusText}</p>
                </div>
              </div>

              <div className="order__card-percent">
                <div
                  className="order__card-percent-inner"
                  style={{ width: (item.total / totalOrder) * 100 + "%" }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center justify-between p-3 bg-white rounded-md text-[#b5b5c3]">
          <div>
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>

          <div className="text-center">
            <span className="block text-black font-semibold">{totalMovie}</span>
            <span className="text-sm font-semibold">Số phim đang chiếu</span>
          </div>
        </div>
        <div className="flex items-center justify-between p-3 bg-white rounded-md text-[#b5b5c3]">
         <RiMovie2Fill />
          <div className="text-center"> 
            <span className="block text-black font-semibold">{totalUser}</span>
            <span className="text-sm font-semibold">Số tài khoản hiện có</span>
          </div>
        </div>
        <div className="flex items-center justify-between p-3 bg-white rounded-md text-[#b5b5c3]">
          <div>
          <RiUserLine />
          </div>

          <div className="text-center">
            <span className="block text-black font-semibold">{totalPost}</span>
            <span className="text-sm font-semibold">Tổng số bài viết</span>
          </div>
        </div>
      </div>

      {/* user đăng ký theo tháng */}
      <div className="bg-white mt-4 rounded-md p-3">
        <Bar options={options} data={data} />
      </div>

      {/* doanh thu hàng tháng */}
      <div className="bg-white mt-4 rounded-md p-3">
        <Line options={optionsLine} data={dataLine} />
      </div>
    </div>
  );
};

export default Dashboard;