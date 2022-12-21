import { Button, Collapse, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RenderSeats from "../../../components/admin/RenderSeats";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getOneSBSTById } from "../../../redux/slice/SeatBySTSlice";
import { CaretRightOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
type Props = {};

const SeatByRoom = (props: Props) => {
  const dispatch = useAppDispatch();
  let { id } = useParams();
  const [seats, setSeats] = useState([]);
  const [seatDetails, setSeatDetails] = useState<any>();
  const [row, setRow] = useState<number>();
  const [column, setColumn] = useState<number>();
  const [seatFile, setSeatFile] = useState<any>();

  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(getOneSBSTById(id));
      setSeats(payload);
    })();
  }, [id]);

  const { rooms } = useAppSelector((state) => state.roomReducer);
  const roomSelect = rooms?.find((item) => item?._id === id);
  const { seatType } = useAppSelector((state) => state.seatTypeReducer);
  useEffect(() => {
    setColumn(roomSelect?.columns);
    setRow(roomSelect?.rows);
  }, []);

  return (
    <div>
      <Button>
        <Link to="/admin/rooms">DS Phòng chiếu</Link>
      </Button>
      <Collapse
        bordered={false}
        defaultActiveKey={["2"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        className="site-collapse-custom-collapse"
      >
        <Panel
          header="Thông tin rạp"
          key="1"
          className="site-collapse-custom-panel"
        >
          <p>Tên rạp: {roomSelect?.name} </p>
          <p>
            Trạng thái rạp:{" "}
            {roomSelect?.status == 0 ? "Đang hoạt động" : "Dừng hoạt động"}
          </p>
          <p>Số lượng ghế: {roomSelect?.rows * roomSelect?.columns}</p>
        </Panel>
        <Panel
          header="Thông tin ghế"
          key="2"
          className="site-collapse-custom-panel"
        >
          <RenderSeats
            setSeatFile={setSeatFile}
            seatFile={seatFile}
            row={row}
            column={column}
            seatDetails={seatDetails}
            setSeatDetails={setSeatDetails}
            seats={seats}
            setSeats={setSeats}
            roomId={id}
          />
        </Panel>
      </Collapse>
      <div className="">
        <div className="mb-10 flex justify-around mx-20">
          {seatType?.map((item: any) => (
            <div className="flex" key={item._id}>
              <p
                className={`w-5 h-5 border-2 border-black`}
                style={{ backgroundColor: `${item.color}` }}
              ></p>
              <span className="text-black pl-2 capitalize  ">{item.name}</span>
            </div>
          ))}

          <div className="flex">
            <p className="w-5 h-5 bg-[#35d406]"></p>
            <span className="text-black pl-2"> Ghế Đang Chọn</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatByRoom;
