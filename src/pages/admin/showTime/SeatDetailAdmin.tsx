import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { Button, Card, Divider, Form, Input } from "antd";
import { Link, useParams } from "react-router-dom";
import configRoute from "../../../config";
import { getAllSBST, updateSBST } from "../../../redux/slice/SeatBySTSlice";
import styles from "./Seats.module.scss";
import { formatCurrency, formatDate, formatTime } from "../../../ultils";
import { getAlVc } from "../../../redux/slice/voucherSlice";
import ApplyVoucher from "../../../components/client/ApplyVoucher";
import Swal from "sweetalert2";
type Props = {};

const AdminSeatRenderDetail = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [tempPrice, setTempPrice] = useState<any>(100000);

  useEffect(() => {
    document.title = "Admin | Detail Seat ";
    (async () => {
      dispatch(getAllSBST());
      dispatch(getAlVc());
    })();
  }, [dispatch]);

  useEffect(() => {
    clearSelectedSeats();
  }, []);

  const { seatsByST } = useAppSelector((state: any) => state.SeatBySTReducer);
  const seat = seatsByST?.find((item: any) => item?._id === id);
  useEffect(() => {
    if (seat) {
      setSeatDetails(seat?.seats);
    }
  }, [seat]);

  const movie = seat?.movieId;
  let selectedSeats: string[] = [];
  const [seatDetails, setSeatDetails] = useState(seat?.seats);

  const nextStepChooseCombo = () => {
    const seatClone = JSON.parse(JSON.stringify(seatDetails));
    let seatArray: any = [];
    for (let key in seatDetails) {
      seatDetails[key].map((seatValue: any, rowIndex: any) => {
        if (seatValue === 2) {
          seatClone[key][rowIndex] = 1;
        }
        setSeatDetails({ ...seatClone });
      });
    }
    console.log(selectedSeats);
    seatArray = { seats: seatClone, _id: id };

    /** update seatByShowtime */
    // dispatch(updateSBST(seatArray))
    //   .unwrap()
    //   .then(() => {
    //     Swal.fire({
    //       icon: "success",
    //       title: "Thành công",
    //       showConfirmButton: false,
    //       timer: 1000,
    //     });
    //   })
    //   .catch((err: any) => alert(err));
  };

  const clearSelectedSeats = () => {
    let newMovieSeatDetails = { ...seatDetails };
    for (let key in seatDetails) {
      seatDetails[key].forEach(
        (seatValue: number, seatIndex: string | number) => {
          if (seatValue === 2) {
            seatDetails[key][seatIndex] = 0;
          }
        }
      );
    }
    setSeatDetails(newMovieSeatDetails);
  };

  const onSeatClick = (seatValue: any, rowIndex: any, key: any) => {
    const seatClone = JSON.parse(JSON.stringify(seatDetails));
    if (seatClone) {
      if (seatValue === 1 || seatValue === 3) {
        return;
      } else if (seatValue === 0) {
        seatClone[key][rowIndex] = 2;
      } else {
        seatClone[key][rowIndex] = 0;
      }
    }
    setSeatDetails({ ...seatClone });
  };

  /**
   * 0 - Not booked
   * 1 - Booked
   * 2 - Selected
   * 3 - Blocked
   */

  const getClassNameForSeats = (seatValue: number) => {
    let dynamicClass;
    if (seatValue === 0) {
      // Not booked
      dynamicClass = styles.seatNotBooked;
    } else if (seatValue === 1) {
      // booked
      dynamicClass = styles.seatBooked;
    } else if (seatValue === 2) {
      // Seat Selected
      dynamicClass = styles.seatSelected;
    } else {
      // Seat Blocked
      dynamicClass = styles.seatBlocked;
    }
    return `${styles.seats} ${dynamicClass}`;
  };

  const RenderSeats = () => {
    let seatArray = [];
    for (let key in seatDetails) {
      let colValue = seatDetails[key].map((seatValue: any, rowIndex: any) => (
        <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>
          {rowIndex === 0 && (
            <span className="text-gray-500 font-bold mr-[20px] pl-[20px]">
              {key}
            </span>
          )}
          <span
            className={getClassNameForSeats(seatValue)}
            onClick={() => onSeatClick(seatValue, rowIndex, key)}
          >
            {rowIndex + 1}
          </span>
          {seatDetails && rowIndex === seatDetails[key].length - 1 && (
            <>
              <br />
              <br />
            </>
          )}
        </span>
      ));
      seatArray.push(colValue);
    }
    return <div className={styles.seatsLeafContainer}>{seatArray}</div>;
  };

  const RenderMovie = () => {
    return (
      <>
        <div className="img_thumnail">
          <img src={movie?.image[0]?.url} style={{ width: "140px" }} />
        </div>
        <h2 className="mt-1 uppercase text-gray-500">{movie?.name}</h2>
        <div className=" text-xs flex ">
          <div className="bg-orange-600 w-[30px] h-[20px] text-slate-100 text-center ">
            {`C${movie?.ageLimit}`}
          </div>
          <div className="pl-[3px]">
            <p className="text-danger text-[12px]">
              (*) Phim chỉ dành cho khán giả từ {movie?.ageLimit} tuổi trở lên
            </p>
          </div>
        </div>
        <div className="uppercase text-[12px]">
          <span className="font-bold"> {seat?.roomId?.name}</span>
        </div>
        <div className="uppercase text-[12px]">
          <span className="font-bold">Suất chiếu:</span>
          {formatTime(seat?.showTimeId?.startAt)} --
          {formatDate(seat?.showTimeId?.startAt)}
        </div>
        <div className="max-w-[300px]">
          <span className="font-bold">Ghế : </span>
          <RenderSeatSelected />
        </div>
        <div className="">
          <span className="font-bold">Voucher</span>
          <ApplyVoucher tempPrice={tempPrice} />
        </div>
        <div className="">
          <span className="font-bold">Tạm Tính : </span>
          <span className="text-orange-600 font-bold">
            {formatCurrency(tempPrice)}
          </span>
        </div>
        <p>Tiền sau giảm : </p>

        <Card
          style={{
            position: "sticky",
            bottom: "0",
            left: "0",
            width: "100%",
            border: "none",
          }}
        >
          <div style={{ display: "flex", justifyContent: "start", gap: "5px" }}>
            <Button htmlType="button">Quay lại</Button>
            <Button
              htmlType="submit"
              type="primary"
              style={{ minWidth: 150 }}
              onClick={nextStepChooseCombo}
            >
              <Link to="#"> Tiếp theo</Link>
            </Button>
          </div>
        </Card>
      </>
    );
  };
  const RenderSeatSelected = () => {
    selectedSeats = [];
    for (let key in seatDetails) {
      seatDetails[key].forEach((seatValue: any, seatIndex: any) => {
        if (seatValue === 2) {
          selectedSeats.push(`${key}${seatIndex + 1},`);
        }
      });
    }
    if (selectedSeats.length) {
      return (
        <div className="break-words break-all max-w-[300px]">
          {selectedSeats}
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={configRoute.routes.AdminShowTimes} style={{ color: "#ffff" }}>
          Xem lại các suất chiếu
        </Link>
      </Button>
      <div className={styles.wrapper}>
        {seatDetails && (
          <div className={styles.seatsContainer}>
            <Card style={{ width: "70%" }}>
              <RenderSeats />
            </Card>
            <Card style={{ width: "30%", height: "450px" }}>
              <RenderMovie />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSeatRenderDetail;
