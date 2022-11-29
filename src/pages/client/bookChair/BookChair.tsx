import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  RenderInfoSeats,
  RenderSeatClient,
} from "../../../components/admin/RenderSeats/RenderSeatClient";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getRooms } from "../../../redux/slice/roomSlice";
import { getOneSBSTById } from "../../../redux/slice/SeatBySTSlice";
import { getAlSt } from "../../../redux/slice/ShowTimeSlice";
import { formatDate, formatTime } from "../../../ultils";
import "./BookChair.scss";
type Props = {};

const BookChair = (props: Props) => {
  const dispatch = useAppDispatch();
  // let id = useSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();
  let idRoom = searchParams.get("room");
  let idShowtime = searchParams.get("showtime");
  const [seats, setSeats] = useState([]);
  const [seatDetails, setSeatDetails] = useState<any>();
  const [row, setRow] = useState<number>();
  const [column, setColumn] = useState<number>();
  const [seatFile, setSeatFile] = useState<any>();
  const { rooms } = useAppSelector((state) => state.roomReducer);
  const { stList } = useAppSelector((state) => state.ShowTimeReducer);
  const showtime = stList.find((item: any) => item._id === idShowtime);
  const roomSelect = rooms?.find((item: any) => item?._id === idRoom);
  React.useEffect(() => {
    dispatch(getAlSt({}));
    dispatch(getRooms());
    (async () => {
      const { payload } = await dispatch(getOneSBSTById(idRoom));
      setSeats(payload);
    })();
  }, []);

  React.useEffect(() => {
    setColumn(roomSelect?.columns);
    setRow(roomSelect?.rows);
  }, []);
  let {currentUser} = useAppSelector((state) => state.authReducer)
  return (
    <>
      <div className="container">
        <div className="title">
          <h3>Chọn ghế</h3>
          <p>
            Bạn đã chọn: <span>{showtime?.movieId?.name}</span>
          </p>
          <p>Phòng chiếu: {roomSelect?.name}</p>
          <p>
            Suất chiếu: {formatTime(showtime?.startAt)} -{" "}
            {formatDate(showtime?.date)}
          </p>
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
            <RenderSeatClient
              setSeatFile={setSeatFile}
              seatFile={seatFile}
              row={row}
              column={column}
              seatDetails={seatDetails}
              setSeatDetails={setSeatDetails}
              seats={seats}
              setSeats={setSeats}
              roomId={roomSelect}
              showtime={showtime}
               userId={undefined}            />
            {/* end chair */}
            <div className="mb-10 flex justify-around mx-20">
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
              <Link to={`/`}>
                <button className="rounded-3xl mt-14 border border-white text-white w-40 h-12">
                  Chọn lại phim
                </button>
              </Link>
            </div>
            <div>
              <img
                className="mx-auto w-[200px] mt-2"
                src={showtime?.movieId?.image[0]?.url}
                alt=""
              />
            </div>
            <RenderInfoSeats
              row={undefined}
              column={undefined}
              seatDetails={undefined}
              setSeatDetails={undefined}
              seatFile={undefined}
              setSeatFile={undefined}
              seats={undefined}
              setSeats={undefined}
              roomId={roomSelect}
              showtime={showtime}
              userId= {currentUser}
               />
          </div>
        </div>
        {/* end chair */}
      </div>
    </>
  );
};

export default BookChair;
