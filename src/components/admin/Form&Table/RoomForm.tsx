import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { Button, Card, Form, FormInstance, Input, Select, Skeleton, InputNumber } from "antd";
import { validateMessages } from "../../../ultils/FormMessage";
import styles from "./room.module.scss"
import { screenData } from '../../../ultils/data';
import { useAppSelector } from '../../../redux/hook';
import MenuContext from "./MenuContext";
interface RoomFormProps {
  form: FormInstance<any>;
  onFinish: (values: any) => void;
  edit?: boolean;
  editData?: boolean;
  loading?: boolean;
  setSeatFile: any;
  seatFile: any;
  seats:any;
  setSeats:any;
  showSeatTye:any;
  rowFile: any,
  colFile: any;
  setRowFile: any;
  setColFile: any;
  blockSeat: any;
  setBlockSeat: any
}
const RoomForm = ({ form, onFinish, edit = false, rowFile, colFile, blockSeat, setBlockSeat, setRowFile, setColFile, loading = false, editData = true, setSeatFile, seatFile }: RoomFormProps) => {
  const [seatDetails, setSeatDetails] = useState<any>();
  const [row, setRow] = useState<number>(rowFile);
  const [column, setColumn] = useState<number>(colFile);
  // const [blockS, setBlockS] = useState<number>(blockSeat);
  const { seatType } = useAppSelector((state:any) => state?.seatTypeReducer);
  const [appSeatType, setAppSeatType] = useState([]);
  const [popup, setPopup] = useState({
      popup: {
        visible: true,
        x: 0,
        y: 0
    }

  })
  
  useEffect(() => {
    clearSelectedSeats();
    // setBlockSeat(blockS)
  },
    [])
  useEffect(() => {
    handleSubmit();
  }, [row, column])

  const onChangeRow = (val: any) => { setRow(val) }
  const onChangeCols = (val: any) => { setColumn(val) }

  const clearSelectedSeats = () => {
    let newMovieSeatDetails = { ...seatDetails };
    for (let key in seatDetails) {

      seatDetails[key].forEach((seatValue: any, seatIndex: any) => {
        if (seatValue === 2) {
          seatDetails[key][seatIndex] = 0;
        }
      })
    }
    return newMovieSeatDetails;
  }

  const handleSubmit = () => {
    let newSeatObject: any = {};
    let key: string;
    for (let i = 0; i < column; i++) {
      if (i < 26) {
        key = String.fromCharCode(65 + i)
      } else {
        let character = String.fromCharCode(64 + (i / 25));
        key = `${character}${String.fromCharCode(64 + i % 25)}`;
      }
      newSeatObject[key] = Array(row).fill(0).map((_, i) => {
        if (seatDetails && seatDetails[key] && seatDetails[key][i]) {
          return seatDetails[key][i];
        } else {
          return 0;
        }
      });
    }
    setSeatDetails(newSeatObject);
    setSeatFile(newSeatObject)
  }
  /**
   * 0 - Not booked
   * 1 - Booked
   * 2 - Selected
   * 3 - Blocked
   */
  const getClassNameForSeats = (seatValue: number) => {
    let dynamicClass;
    if (seatValue === 0) {  // Not booked
      dynamicClass = styles.seatNotBooked;
    } else if (seatValue === 1) {  // booked
      dynamicClass = styles.seatBooked;
    } else if (seatValue === 2) {  // Seat Selected
      dynamicClass = styles.seatSelected;
    } else {  // Seat Blocked
      dynamicClass = styles.seatBlocked;
    }
    return `${styles.seats} ${dynamicClass}`
  }

  const onSeatClick = (seatValue: number, rowIndex: number, key: string) => {
    if (seatDetails) {
      if (seatValue === 1) {
        return;
      } else if (seatValue === 0) {
        seatDetails[key][rowIndex] = 3;
        // setBlockS((blockSeat) => blockSeat + 1);
      } else {
        seatDetails[key][rowIndex] = 0;
        // setBlockS((blockSeat) => blockSeat - 1);
      }
    }
    setSeatDetails({ ...seatDetails });
  }
const onRow = (record:any) => {
  return ({
    onContextMenu: (event: { preventDefault: () => void; clientX: any; clientY: any; }) => {
      event.preventDefault()
      if (popup.popup.visible) {
      } else {
        const that = this
        document.addEventListener(`click`, function onClickOutside() {
          // @ts-ignore
          setPopup({popup: {visible: false}})
          document.removeEventListener(`click`, onClickOutside)
        })
      }
      // @ts-ignore
      setPopup({
        popup: {
          record,
          visible: true,
          x: event.clientX,
          y: event.clientY
        }
      })
    }
  });
}
  const RenderSeats = () => {
    let seatArray = [];
    for (let key in seatDetails) {

      let colValue = seatDetails[key]?.map((seatValue: any, rowIndex: any) => (
        <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>
          {rowIndex === 0 && <span className={styles.colName}>{key}</span>}
          <span className={getClassNameForSeats(seatValue)} onClick={() => onSeatClick(seatValue, rowIndex, key)} onRow={onRow}>
            {rowIndex + 1}
            <MenuContext {...popup} />
          </span>
          {seatDetails && rowIndex === seatDetails[key].length - 1 && <><br /><br /></>}
        </span>
      ))
      seatArray.push(colValue);
    }
    return (
      <div className={styles.seatsLeafContainer}>{seatArray}</div>
    )
  }

  return (

    <div className="">
      {editData ? (
        <>
          <Form layout="vertical" className='flex' form={form} onFinish={onFinish} validateMessages={validateMessages}>
            <Card className="col-2">
              <Form.Item label="Tên rạp" name="name" rules={[{ type: 'string', required: true, min: 5, max: 20, whitespace: true }]}>
                <Input placeholder="Nhập vào" />
              </Form.Item>
              <Form.Item label="screen" name="screen" rules={[{ required: true }]}>
                <Select value={screen} >
                  {screenData?.map((item: any) => (
                    <Select.Option key={item?.value}>{item?.name}</Select.Option>
                  ))}
                </Select>

              </Form.Item>
              <Form.Item label="seatTypeId" name="seatTypeId" rules={[{ required: true }]}>
                <Select>
                {seatType && seatType?.map((item: any) => (
                  <Select.Option value={item._id} key={item._id} >{item.name}</Select.Option>
                ))}
            </Select>

              </Form.Item>
              <Form.Item label="columns" name="rows"  >
                <InputNumberCs min={1} max={20} placeholder="tạo số hàng" onChange={onChangeRow} />
              </Form.Item>
              <Form.Item label="rows" name="columns"  >
                <InputNumberCs min={1} max={20} placeholder="tạo số hàng" onChange={onChangeCols} />
              </Form.Item>
              <Card style={{ position: "sticky", bottom: "0", left: "0", width: "100%", border: 'none' }}>
                <div style={{ display: "flex", justifyContent: "start", gap: "5px" }}>
                  <Button
                    htmlType="submit"
                    type="primary"
                    style={{ minWidth: 150 }}
                  >
                    Lưu
                  </Button>
                </div>
              </Card>
            </Card>
            <Card className="col-10 ">
              {seatDetails && <RenderSeats />}
            </Card>
          </Form>
        </>
      ) : (<>
        <Skeleton />
      </>)
      }
    </div >

  )
}

export default RoomForm;
const InputNumberCs = styled(InputNumber)`
  width: 100%
`