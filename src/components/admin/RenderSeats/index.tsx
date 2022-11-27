import { Collapse, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getOneSBSTById } from "../../../redux/slice/SeatBySTSlice";
import { updateSeatThunk } from "../../../redux/slice/SeatSlice";
import { defaultStatus } from "../../../ultils/data";
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
};
const { Option } = Select;
const { Panel } = Collapse;
const RenderSeats = ({
  row,
  column,
  seats,
  setSeats,
  seatDetails,
  setSeatDetails,
  seatFile,
  setSeatFile,
  roomId,
}: Props) => {
  const [elClick, setElClick] = useState();
  const dispatch = useAppDispatch();
  useEffect(() => {
    handleSubmit();
  }, [seats]);
  useEffect(() => {
    clearSelectedSeats();
  }, []);
  const [total, setTotal] = useState(0);
  const { seatType } = useAppSelector((state) => state.seatTypeReducer);

  const clearSelectedSeats = () => {};

  const getClassNameForSeats = (seatValue: any) => {
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
  const onSeatClick = (seatValue: any) => {
    let arrValue: any[] = [];
  };

  const changeStatusSeat = (id: any, val: Number) => {
    dispatch(updateSeatThunk({ _id: id, status: val }))
      .unwrap()
      .then(() => {
        message.success("Thay đổi trạng thái ghế thành công");
        handleSubmit();
      })
      .catch(() => message.error("Lỗi"));
  };

  const changeSeatType = (id: any, val: any) => {
    console.log(id, val);
    const payload = {
      _id: id,
      seatTypeId: val,
    };

    dispatch(updateSeatThunk(payload))
      .unwrap()
      .then(() => {
        message.success("Thay đổi thể loại ghế thành công");
        dispatch(getOneSBSTById(roomId));
      })
      .catch(() => message.error("Lỗi"));
  };
  const info = (val: any) => {
    console.log("info", val);
    Modal.info({
      title: `Seat infomation`,
      content: (
        <div>
          <div>ID : {val?._id}</div>
          <div>Vị trí ghế: {val?.row + val?.column}</div>
          <div>
            Loại ghế:
            <Select
              value={val?.seatTypeId?.name}
              onChange={(value: any) => {
                changeSeatType(val?._id, value);
              }}
            >
              {seatType?.map((item: any) => (
                <Option value={item?._id} key={item?._id}>
                  {item?.name}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            Trạng thái ghế:
            <Select
              value={val?.status === 0 ? "Hoạt động" : "Dừng hoạt động"}
              onChange={(value: any) => {
                changeStatusSeat(val?._id, value);
              }}
            >
              {defaultStatus?.map((item: any) => (
                <Option value={item?.value} key={item?.value}>
                  {item?.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      ),
      onOk() {},
    });
  };

  const RenderSeatsContain = () => {
    let seatArray = [];
    for (let key in seatDetails) {
      let colValue = seatDetails[key]?.map((seatValue: any, rowIndex: any) => (
        <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>
          {rowIndex === 0 && <span className={styles.colName}>{key}</span>}
          <span
            className={getClassNameForSeats(seatValue)}
            onClick={() => {
              onSeatClick(seatValue);
            }}
            onDoubleClick={() => {
              info(seatValue);
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

export default RenderSeats;
