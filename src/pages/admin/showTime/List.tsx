import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { Card, Collapse, message, Popconfirm, Table, Tag, Tooltip } from 'antd';
import { Space, Button } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate, formatTime, convertMovieTime } from '../../../ultils'
import configRoute from '../../../config';
import { getAlSt, removeData } from '../../../redux/slice/ShowTimeSlice'
import { useSearchParams } from 'react-router-dom';
import { CaretRightOutlined } from '@ant-design/icons';
import { async } from '@firebase/util';
type Props = {}
const { Panel } = Collapse;
const AdminShowTimeList = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = "Admin | Showtime"
    dispatch(getAlSt({}))
  }, [dispatch]);

  const { stList, errorMessage } = useAppSelector((state: any) => state.ShowTimeReducer);
  const { movie } = useAppSelector((state) => state.movie);
  const [searchParams, setSearchParams] = useSearchParams();
  let movieId = searchParams.get("movieId");
  let movieSelect = movie?.find((item: any) => item?._id === movieId);
  const [showTimeByDate, setShowTimeByDate] = useState<any>()
  const showTimeByMovieId = (stList?.filter((item: any) => item?.movieId?._id === movieId));

  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={`/admin/showTimes/create?movieId=${movieSelect?._id}`} style={{ color: '#ffff' }}>Create ShowTime</Link>
      </Button>
      <Collapse
        bordered={false}
        defaultActiveKey={['2']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        className="site-collapse-custom-collapse"
      >
        <Panel header="Thông tin phim" key="1" className="site-collapse-custom-panel">
          <div className=''>
            <img src={movieSelect?.image[0]?.url} alt="" width="140px" height="140px" />
            <div><b>Tên phim : </b>{movieSelect?.name}</div>
            <div><b>Ngày khởi chiếu : </b>{formatDate(movieSelect?.releaseDate)}</div>
            <div><b>Thời lượng : </b>{convertMovieTime(movieSelect?.runTime) + 'h'}</div>
            <div><b>Tên phim : </b>{movieSelect?.name}</div>
          </div>
        </Panel>
        <Panel header="Thông tin suất chiếu" key="2" className="site-collapse-custom-panel">
          {showTimeByMovieId ? showTimeByMovieId?.map((item: any) => (
            <Card key={item?._id}  >
              <h1>Ngày chiếu : {formatDate(item?.date)}</h1>
              <div>Giờ chiếu : {formatTime(item?.startAt)} - {formatTime(item?.endAt)}</div>
              <div>Phòng chiếu :
                {item?.roomId?.map((roomItem: any) => (
                  <Button key={roomItem?._id}>
                    <Link to={`/showTimes?date=${formatDate(item?.date)}?movieId=${item?._id}?roomId=${roomItem?._id}`}>
                      {roomItem?.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </Card>
          )) : (
            <>
              <p>Chưa có suất chiếu nào</p>
            </>
          )}
        </Panel>
      </Collapse>

    </div>
  )
}

export default AdminShowTimeList