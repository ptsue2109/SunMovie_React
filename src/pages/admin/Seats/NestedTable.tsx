import React, { useState, useEffect } from 'react';
import { Button, Space, TableColumnsType } from 'antd';
import { Table } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { Link, useSearchParams } from 'react-router-dom';
import { formatDate, formatTime } from '../../../ultils';
import { getAlSt } from '../../../redux/slice/ShowTimeSlice';
import { isFuture, isPast, parseISO } from "date-fns";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type Props = {}
interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}
const NestedTable = (props: Props) => {
  const [payload, setPayload] = useState<any[]>([]);
  const [showByDate, setShowByDate] = useState<any[]>([]);
  const [date, setDate] = useState<any>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.title = "Admin | Showtime"
    dispatch(getAlSt({}));
  }, [dispatch]);

  const { stList } = useAppSelector((state: any) => state.ShowTimeReducer);
  const [searchParams, setSearchParams] = useSearchParams();
  let movieId = searchParams.get("movieId");
  let { movie } = useAppSelector((state: any) => state.movie);
  let movieSelect = movie.find((item: any) => item?._id === movieId);

  useEffect(() => {
    if (stList && movieId) {
      let itemGet = stList?.filter((item: any) => item?.movieId?._id === movieId);
      setPayload(itemGet);
    }
  }, [stList, movieId]);

  useEffect(() => {
    if (payload) {
      handleSubmit();
    }
  }, [payload]);

  const handleSubmit = () => {
    const groupByDate = payload?.reduce((accumulator: any, arrayItem: any) => {
      let rowName = formatDate(arrayItem.date)
      if (accumulator[rowName] == null) {
        accumulator[rowName] = [];
      }
      accumulator[rowName].push(arrayItem);
      return accumulator;
    }, {});
    setShowByDate({ ...groupByDate });
  };

  const expandedRowRender = (row: any) => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: '', dataIndex: 'indexKey', key: 'indexKey', width: 1, render: (_: any, { indexKey }: any) => <p className='text-white'>{indexKey}</p> },
      { title: 'Thời gian chiếu ', dataIndex: 'startAt', key: 'startAt', render: (_: any, { startAt, endAt }: any) => <p>Từ {startAt} đến {endAt}</p>, width: 200 },
      {
        title: 'Phòng chiếu', dataIndex: 'room', width: 250, key: 'room', render: (_: any, { room, _id }: any) => (
          <>
            {room?.map((roomItem: any) => (
              <Button key={roomItem?._id} className="ml-3">
                <Link to={`/book-chair?room=${roomItem?._id}&showtime=${_id}`}>
                  {roomItem?.name}
                </Link>
              </Button>
            ))}
          </>
        )
      },
      // { title: 'Trạng thái ', dataIndex: 'status', key: 'status' },
      { title: 'Trạng thái truy cập', dataIndex: 'status2', key: 'status2' },
      {
        title: "Hành động",
        key: "status",
        render: (_: any, record: any) => (
          <Link to={`${record._id}`}>
            <EditOutlined
              style={{ color: "var(--primary)", fontSize: "18px" }}
            />
          </Link>
        ),
      },

    ];

    const data: any[] = [];
    for (let key in showByDate) {
      showByDate[key]?.map((item: any, index: any) => {
        if (formatDate(item?.date) == row?.date) {
          data.push({
            indexKey: index,
            startAt: formatTime(item?.startAt),
            endAt: formatTime(item?.endAt),
            _id: item?._id,
            status: item?.status == 0 ? "Đang hoạt động" : "Dừng hoạt động",
            room: item?.roomId,
            status2: isPast(parseISO(item?.date)) === true ? "Đã hết hạn, không thể truy cập" : "Vẫn được chọn"
          })
        }

      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<any[]> = [
    { title: 'Ngày chiếu', dataIndex: 'date', key: 'date' },
    { title: '', dataIndex: 'index', key: 'index', width: 3, render: (_: any, { index }: any) => <p className='text-white'>{index}</p> },
  ];

  const data: any[] = [];
  for (let key in showByDate) {
    data.push({
      index: 1,
      date: key,
    });
  }




  return (
    <div>
      <h3>Danh sách giờ chiếu theo của phim {movieSelect?.name}</h3>
      <Table
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={data}
      />
    </div>
  )
}

export default NestedTable