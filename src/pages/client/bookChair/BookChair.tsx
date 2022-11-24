import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import RenderSeats from "../../../components/admin/RenderSeats";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getAlSt } from "../../../redux/slice/ShowTimeSlice";
import "./BookChair.scss";
type Props = {};

const BookChair = (props: Props) => {
  const dispatch = useAppDispatch();
  let { id } = useParams();
  const [seats, setSeats] = useState([]);
  const [seatDetails, setSeatDetails] = useState<any>();
  const [row, setRow] = useState<number>();
  const [column, setColumn] = useState<number>();
  const [seatFile, setSeatFile] = useState<any>();
  const { rooms } = useAppSelector((state) => state.roomReducer);
  const { stList } = useAppSelector((state) => state.ShowTimeReducer);
  const showtime = stList.find((item: any) => item._id === id);
  const roomSelect = rooms?.find((item) => item?._id === id);
  console.log(showtime);
  React.useEffect(() => {
    dispatch(getAlSt({}));
  }, []);
  return (
    <>
      <div className="container">
        <div className="title">
          <h3>Chọn ghế</h3>
          <p>
            Bạn đã chọn: <span>AVATAR 2</span>{" "}
          </p>
          <p>Phòng chiếu: 5</p>
          <p>Suất chiếu: 16:00 - 29/05/2022</p>
        </div>

        {/* chair */}
        <div className="mt-20 grid grid-cols-[900px,300px] gap-10 ">
          <div className="border border-[#ccc] rounded-md p-10 ">
            <p className="text-white">
              Để chọn ghế vui lòng chọn ghế ưa thích theo icon
            </p>
            <p className="text-white">
              Click tiếp vào ghế đã chọn để xoá lựa chọn
            </p>
            <div className="my-10">
              <img
                className="mx-auto"
                src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/img49.png"
                alt=""
              />
            </div>

            {/* chair */}
            {/* <RenderSeats
            setSeatFile={setSeatFile}
            seatFile={seatFile}
            row={row}
            column={column}
            seatDetails={seatDetails}
            setSeatDetails={setSeatDetails}
            seats={seats}
            setSeats={setSeats}
            roomId={id}
          /> */}
            {/* end chair */}
            <div className="my-10 flex justify-around mx-20">
              <div className="flex">
                <p className="w-5 h-5 bg-white"></p>
                <span className="text-white pl-2"> Ghế Thường</span>
              </div>
              <div className="flex">
                <p className="w-5 h-5 bg-blue-800"></p>
                <span className="text-white pl-2"> Ghế VIP</span>
              </div>
              <div className="flex">
                <p className="w-5 h-5 bg-pink-400"></p>
                <span className="text-white pl-2"> Ghế Đôi</span>
              </div>
              <div className="flex">
                <p className="w-5 h-5 bg-green-800"></p>
                <span className="text-white pl-2"> Ghế Đã Chọn</span>
              </div>
              <div className="flex">
                <p className="w-5 h-5 bg-red-600"></p>
                <span className="text-white pl-2"> Ghế Đã Bán</span>
              </div>
            </div>
          </div>
          <div className="h-[598px] bg-[url(https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/bg04.png)]">
            <div className="text-center">
              <Link to={`#`}>
                <button className="rounded-3xl mt-14 border border-white text-white w-40 h-12">
                  Chọn lại phim
                </button>
              </Link>
            </div>
            <div>
              <img
                className="mx-auto w-[200px] mt-2"
                src="https://chieuphimquocgia.com.vn/content/images/0016606_0.jpeg"
                alt=""
              />
            </div>
            <div className="text-white px-3 mt-5">
              <p>Ghế đã chọn: D3,D5</p>
              <div className="border border-white px-3 my-2"></div>
              <p>
                Tổng:{" "}
                <span className="text-red-600 text-2xl pl-5">200.000đ</span>
              </p>
              <div className="text-center">
                <button className="rounded-3xl my-5 bg-red-600 border border-white text-white w-36 h-12">
                  Thanh Toán
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* end chair */}
      </div>
    </>
  );
};

export default BookChair;
