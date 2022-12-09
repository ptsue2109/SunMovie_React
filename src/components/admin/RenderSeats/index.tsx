import {
  Button,
  Card,
  Collapse,
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getOneSBSTById } from "../../../redux/slice/SeatBySTSlice";
import { updateSeatThunk } from "../../../redux/slice/SeatSlice";
import { defaultStatus } from "../../../ultils/data";
import styles from "../Form&Table/room.module.scss";
import configRoute from "../../../config";
import { useNavigate } from "react-router-dom";
type Props = {
  row?: any;
  column?: any;
  seatDetails?: any;
  setSeatDetails?: any;
  seatFile?: any;
  setSeatFile?: any;
  seats?: any;
  setSeats?: any;
  roomId?: any;
  showTable?: any;
};
const { Option } = Select;
const RenderSeats = ({ row, column, seats, setSeats, seatDetails, setSeatDetails, seatFile, setSeatFile, roomId, showTable, }: Props) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [seatArr, setSeatArr] = useState<any>([]);
  const [seatArrSelect, setSeatArrSelect] = useState<any>([]);
  const [optionsStatus, setOptionsStatus] = useState();
  const [optionsSeatTpe, setOptionsSeatTpe] = useState();
  const { seatType } = useAppSelector((state) => state.seatTypeReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleSubmit();
  }, [seats]);

  const getClassNameForSeats = (seatValue: any) => {
    let dynamicClass;
    if (seatValue == 0) {
      // Not booked
      dynamicClass = styles.seatNotBooked;
    } else if (seatValue == 1 || seatValue == null) {
      // booked
      dynamicClass = styles.seatBlocked;
    } else if (seatValue == 2) {
      // Seat Selected
      dynamicClass = styles.seatSelected;
    }
    return `${styles.seats} ${dynamicClass}`;
  };
  const handleSubmit = () => {
    if (seats) {
      const groupByRowName = seats?.reduce(
        (accumulator: any, arrayItem: any) => {
          let rowName = arrayItem.row;
          if (accumulator[rowName] == null) {
            accumulator[rowName] = [];
          }
          accumulator[rowName].push(arrayItem);
          return accumulator;
        },
        {}
      );

      setSeatDetails({ ...groupByRowName });
      setSeatFile({ ...groupByRowName });
    }
  };

  const onSeatClick = (seatValue: any, rowIndex: any, key: any) => {
    let item = JSON.parse(JSON.stringify(seatValue));
    if (item?.status === 1 || item?.status == null) {
      return;
    } else if (item?.status === 0) {
      item["status"] = 2;
    } else if (item?.status === 2) {
      item["status"] = 0;
    }
    seatDetails[key][rowIndex] = { ...item };
    setSeatDetails({ ...seatDetails });
    let flatern = findSelectSeat();
    setSeatArr(flatern);
  };
  const findSelectSeat = () => {
    let arr: any = [];
    for (const key in seatDetails) {
      let colVal = seatDetails[key]?.filter(
        (seatVal: any) => seatVal?.status == 2
      );
      arr = [...arr, colVal];
    }
    const flatten = arr.reduce((a: any, b: any) => {
      return a.concat(b);
    });
    return flatten;
  };
  const info = (val: any) => {
    Modal.info({
      title: `Seat infomation`,
      content: (
        <div>
          <div>Id : {val?._id}</div>
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
          <div>Vị trí ghế: {val.row + val.column}</div>
          <div>
            Trạng thái ghế:
            <Select
              value={val.status === 0 ? "Hoạt động" : "Dừng hoạt động"}
              onChange={(value: any) => {
                changeStatusSeat(val?._id, value);
              }}
            >
              {defaultStatus?.map((item: any) => (
                <Option value={item?._id} key={item?.value}>
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
  const changeStatusSeat = (id: any, val: number) => {
    const upload = { seatId: [id], status: Number(val), roomId: roomId };
    dispatch(updateSeatThunk(upload))
      .unwrap()
      .then(() => {
        dispatch(getOneSBSTById(roomId));
        message.success("Thay đổi trạng thái thành công");
      })
      .catch(() => message.error("Lỗi"));
  };

  const changeSeatType = (id: any, val: any) => {
    const payload = { seatId: [id], seatTypeId: val, roomId: roomId };
    dispatch(updateSeatThunk(payload))
      .unwrap()
      .then(() => {
        dispatch(getOneSBSTById(roomId));
        message.success("Thay đổi loại ghế thành công");
      })
      .catch(() => message.error("Lỗi"));
  };
  const RenderSeatsContain = () => {
    let seatArray: any[] = [];
    for (let key in seatDetails) {
      let colValue = seatDetails[key]?.map((seatValue: any, rowIndex: any) => (
        <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>
          {rowIndex === 0 && <span className={styles.colName}>{key}</span>}
          <span className={getClassNameForSeats(seatValue?.status)} onClick={() => { onSeatClick(seatValue, rowIndex, key) }} onDoubleClick={() => { info(seatValue) }}>
            {rowIndex + 1}
          </span>

          {seatDetails && rowIndex === seatDetails[key].length - 1 && (
            < >
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

  //table
  const columns: any[] = [
    { title: "STT", dataIndex: "key" },
    { title: "id", dataIndex: "_id", width: 5 },
    { title: "position", dataIndex: "position" },
  ];
  const data: any[] = seatArr?.map((item: any, index: any) => {
    return {
      key: index + 1,
      _id: item?._id,
      position: `${item?.row}${item?.column}`,
    };
  });

  const onSelectChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
    let selectArr: any[] = seatArr?.filter((item: any, index: any) =>
      selectedRowKeys.includes(index + 1)
    );
    setSeatArrSelect(selectArr);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const renderChoice = () => {
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const onFinish = (val: any) => {
      const payload = {
        status: Number(optionsStatus),
        seatTypeId: optionsSeatTpe,
        seatId: [...seatArr],
      };
      console.log(optionsSeatTpe, optionsStatus);

      if (optionsSeatTpe === undefined || optionsStatus === undefined) {
        message.error({ content: "Thêm đẩy đủ trường" });
      } else {
        dispatch(updateSeatThunk(payload))
          .unwrap()
          .then(() => {
            message.success("Update thành công");
            navigate(configRoute.routes.adminRooms);
          })
          .catch(() => message.error("Lỗi update"));
      }
    };
    const getStatusChoice = (val: any) => { setOptionsStatus(val) };
    const getSeatTypeChoice = (val: any) => { setOptionsSeatTpe(val) };

    return (
      <>
        <Button type="primary" onClick={showModal}>
          choice List
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onCancel={handleCancel}
          okButtonProps={{ style: { display: "none" } }}
        >
          <Form onFinish={onFinish} form={form}>
            <div>
              Trạng thái ghế:
              <Select
                placeholder="Vui lòng chọn trạng thái ghế"
                style={{ width: "200px" }}
                onChange={(value: any) => getStatusChoice(value)}
              >
                {defaultStatus?.map((item: any) => (
                  <Option value={item?._id} key={item?.value}>
                    {item?.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mt-2">
              Loại ghế:
              <Select
                placeholder="Vui lòng chọn loại ghế"
                style={{ width: "200px" }}
                onChange={(value: any) => getSeatTypeChoice(value)}
              >
                {seatType?.map((item: any) => (
                  <Option value={item?.value} key={item?._id}>
                    {item?.name}
                  </Option>
                ))}
              </Select>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "20px" }}
            >
              Change all items
            </Button>
          </Form>
        </Modal>
      </>
    );
  };
  const renderSeatClick = () => {
    return (
      <div className="w-full mt-3">
        {selectedRowKeys.length >= 1 && (
          <div className="flex gap-3">{renderChoice()}</div>
        )}
        <div style={{ width: "100%" }}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </div>
      </div>
    );
  };
  return (
    <div className="flex overflow-hidden gap-3">
      <div className="col-8 p-5">{RenderSeatsContain()}</div>
      <div className="col-4 ">{renderSeatClick()}</div>
      <div>
        {seatArrSelect &&
          seatArrSelect?.map((item: any) => (
            <div key={item?._id}>{item?._id}</div>
          ))}
      </div>
    </div>
  );
};

export default RenderSeats;
