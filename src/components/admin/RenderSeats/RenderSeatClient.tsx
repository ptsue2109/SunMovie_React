import { Collapse, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { addSeats } from "../../../redux/slice/SeatSlice";
import { formatCurrency } from "../../../ultils";
import styles from "../Form&Table/room.module.scss";

type Props = {
  row: any;
  column: any;
  seatDetails: any;
  setSeatDetails: any;
  seatFile: any;
  setSeatFile: any;
  seats: any;
  setSeats: any;
  roomId: any;
  showtime: any;
};
export const RenderInfoSeats = () => {
  const { arrSeats } = useAppSelector((state) => state.SeatsReducer);
  console.log("seats:", arrSeats);
  let i = 0;
  const sum = (a: any, b: any) => {
    i++;
    return a + b.totalPriceSeat;
  };
  const total = arrSeats.reduce(sum, 0);

  return (
    <>
      <div className="text-white px-3 mt-5">
        <p>
          Ghế đã chọn:
          {arrSeats?.map((item: any) => (
            <span className="text-white" key={item._id}>
              {" " + item.row + item.column + ", "}
            </span>
          ))}
        </p>
        <div className="border border-white px-3 my-2"></div>
        <p>
          Tổng:
          <span className="text-red-600 text-2xl pl-5">
            {formatCurrency(total)}
          </span>
        </p>

        <div className="text-center">
          <button className="rounded-3xl my-5 bg-red-600 border border-white text-white w-36 h-12">
            Thanh Toán
          </button>
        </div>
      </div>
    </>
  );
};
export const RenderSeatClient = ({
  row,
  column,
  seats,
  setSeats,
  seatDetails,
  setSeatDetails,
  seatFile,
  setSeatFile,
  roomId,
  showtime,
}: Props) => {
  const [elClick, setElClick] = useState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    handleSubmit();
  }, [seats]);
  useEffect(() => {
    clearSelectedSeats();
  }, []);
  const [classSeatChoose, setClassSeatChoose] = useState("");

  const clearSelectedSeats = () => {};

  const getClassNameForSeats = (seatValue: any) => {
    // console.log(seatValue);
    let seatStatus = seatValue?.status;
    let dynamicClass;
    if (seatStatus === 0) {
      // Not booked
      dynamicClass = styles.seatNotBooksed;
    } else if (seatStatus === 1) {
      // booked
      dynamicClass = styles.seatBooked;
    } else if (seatStatus === 2) {
      // Seat Selected
      dynamicClass = styles.seatSelected;
    } else {
      // Seat Blocked
      dynamicClass = styles.seatBlocked;
    }
    return `${styles.seats} ${dynamicClass}`;
  };

  const handleSubmit = () => {
    const groupByRowName = seats?.reduce((accumulator: any, arrayItem: any) => {
      let rowName = arrayItem.row;
      if (accumulator[rowName] == null) {
        accumulator[rowName] = [];
      }
      accumulator[rowName].push(arrayItem);
      return accumulator;
    }, {});

    setSeatDetails({ ...groupByRowName });
    setSeatFile({ ...groupByRowName });
  };
  const price = roomId?.formatId?.extraPrice + showtime?.price;

  const onSeatClick = (seatValue: any) => {
    seatValue = {
      ...seatValue,
      totalPriceSeat: seatValue?.seatTypeId?.extraPrice + price,
    };
    if (seatValue.status == 0) {
      dispatch(addSeats(seatValue));
    }
  };

  const RenderSeatsContain = () => {
    let seatArray = [];
    for (let key in seatDetails) {
      let colValue = seatDetails[key]?.map((seatValue: any, rowIndex: any) => (
        <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>
          {rowIndex === 0 && <span className={styles.colName}>{key}</span>}
          <span
            className={`${getClassNameForSeats(seatValue)} ${classSeatChoose}`}
            onClick={() => {
              onSeatClick(seatValue);
            }}
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
  return (
    <div className="p-̀̀̀̀5 mx-̀̀5 h-[1024px] w-full">
      <div className="pt-5 m-5">{RenderSeatsContain()}</div>
    </div>
  );
};
// export default RenderSeatClient;
