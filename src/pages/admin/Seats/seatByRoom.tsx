import { Button, Collapse, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RenderSeats from "../../../components/admin/RenderSeats";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getOneSBSTById } from "../../../redux/slice/SeatBySTSlice";
import { CaretRightOutlined } from "@ant-design/icons";
import { updateSeatThunk } from "../../../redux/slice/SeatSlice";

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
  console.log("roomSelect", roomSelect);

  useEffect(() => {
    setColumn(roomSelect?.columns);
    setRow(roomSelect?.rows);
  }, []);

  return (
    <div>
      <Button>
        <Link to="/admin/rooms">List room</Link>
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
            {roomSelect?.status ? "Đang hoạt động" : "Dừng hoạt động"}
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
    </div>
  );
};

export default SeatByRoom;
