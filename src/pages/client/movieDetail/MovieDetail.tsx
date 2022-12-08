import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./MovieDetail.module.css";
import { BsCalendar } from "react-icons/bs";
import { GiFilmSpool } from "react-icons/gi";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getOneMovie } from "../../../redux/slice/Movie";
import {
  convertDate,
  convertDateToNumber,
  formatDate,
  formatTime,
} from "../../../ultils";
import { getAlSt } from "../../../redux/slice/ShowTimeSlice";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import styled from "styled-components";
import RelateMovie from "../RelateMovie";
import moment from "moment";
import Comente from "../comment";
type Props = {};

const MovieDetail = (props: Props) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isActive, setActive] = useState(1);
  const [relateArr, setRelateArr] = useState([]);
  const [cometArr, setComentArr] = useState([]);
  const Toggle = (number: any) => {
    setActive(number);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { slug } = useParams();
  const { oneMovie: data } = useAppSelector((state: any) => state.movie);
  const { movie } = useAppSelector((state) => state.movie);

  let movieSelectId = data?.movie?._id;

  useEffect(() => {
    if (movie) {
      let arr = movie?.filter((item: any) => item?._id !== movieSelectId);
      setRelateArr(arr);
    }
  }, [movieSelectId]);

  useEffect(() => {
    dispatch(getOneMovie(slug));
  }, [slug]);
  useEffect(() => {
    dispatch(getAlSt({}));
  }, []);

  if (data == "") return <div>Loading...</div>;
  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleOk2 = () => {
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  const RenderShowTime = () => {
    const [idShowtime, setIdShowtime] = useState();
    const [dateChoose, setDateChoose] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { stList } = useAppSelector((state) => state?.ShowTimeReducer);
    let showTimeList = stList?.filter(
      (item: any) => item?.movieId?._id === movieSelectId && item?.status === 0
    );
    showTimeList = showTimeList.map((item: any) => {
      return (item = {
        ...item,
        date: convertDateToNumber(item.date),
      });
    });
    const showModal = (id: any) => {
      setIsModalOpen(true);
      setIdShowtime(id);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const onDate = (date: any) => {
      let dateNew: any = convertDateToNumber(date);
      setDateChoose(dateNew);
    };
    let showtime: any = showTimeList.filter(
      (item: any) => item.date == dateChoose
    );
    const getOneShowtime = showTimeList.find(
      (item: any) => item._id === idShowtime
    );
    let arrDate: any = [];
    showTimeList?.map((item: any) => {
      arrDate.push(item.date);
    });
    let today = new Date();
    arrDate = arrDate
      .sort()
      .filter(
        (item: any, index: any) =>
          arrDate.indexOf(item) === index && item >= convertDateToNumber(today)
      );

    showtime = showtime
      .sort((a: any, b: any) => convertDate(a.startAt) - convertDate(b.startAt))
      .filter((item: any) => convertDate(today) < convertDate(item.startAt));

    if (!showTimeList) return <div>Loading...</div>;

    return (
      <>
        <Modal
          title="Vui lòng chọn phòng"
          footer={null}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="grid grid-cols-4 gap-2">
            {getOneShowtime
              ? getOneShowtime.roomId.map((item: any) => (
                  <div
                    key={item._id}
                    className="border border-black px-3 py-2 hover:bg-[#132445] text-center"
                  >
                    <Link
                      to={`/book-chair?room=${item._id}&showtime=${getOneShowtime._id}`}
                    >
                      <a className="text-black hover:text-white ">
                        {item.name}
                      </a>
                    </Link>
                  </div>
                ))
              : ""}
          </div>
        </Modal>
        <div className={isActive == 1 ? styles.showTimesList : "hidden"}>
          <div className={styles.showTimesListItem}>
            {showTimeList
              ? arrDate?.map((item: any, index: any) => (
                  <span
                    key={index}
                    onClick={() => onDate(item)}
                    className="cursor-pointer"
                  >
                    {formatDate(item)}
                  </span>
                ))
              : "Không có suất chiếu nào"}
          </div>

          <div>
            {arrDate.length == 0 ? (
              <p className="text-white">
                Xin lỗi, Hiện tại chưa có xuất chiếu nào
              </p>
            ) : (
              <div>
                <div className={styles.showTimesListItem}>
                  {showtime != "" ? (
                    <div>
                      <p className="text-white">Vui lòng chọn khung giờ</p>
                      {showtime.map((item: any) => (
                        <span
                          key={item._id}
                          onClick={() => showModal(item._id)}
                          className="cursor-pointer"
                        >
                          {formatTime(item.startAt)}
                        </span>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Modal
        className="newStyle"
        title={data?.name}
        width={950}
        footer={null}
        open={isModalOpen2}
        onOk={handleOk2}
        onCancel={handleCancel2}
      >
        <iframe
          width="900"
          height="500"
          src={`https://www.youtube.com/embed/${data?.movie?.trailerUrl}`}
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal>

      <div className={styles.container}>
        <div className={styles.title}>
          <h3>Chi tiết phim</h3>
        </div>
        <div className={styles.content}>
          <div className={styles.content_img}>
            <img src={data?.movie?.image[0]?.url} alt="" />
          </div>
          <div className={styles.content_info}>
            <h3>{data?.movie?.name}</h3>
            <div className={styles.content_info_items}>
              <div className={styles.content_info_item}>
                <p>
                  <span>Loại phim:</span>{" "}
                  {data.nameMovieType.map((x: any) => x + ", ")}
                </p>
                <p>
                  <span>Thời lượng:</span> {data?.movie?.runTime}
                </p>
                <p>
                  <span>Diễn viên:</span> {data?.movie?.actor}
                </p>
                <p>
                  <span>Đạo diễn:</span> {data?.movie?.director}
                </p>
                <p>
                  <span>Xuất xứ:</span> {data?.movie?.country}
                </p>
                <p>
                  <span>Khởi chiếu:</span>{" "}
                  {formatDate(data?.movie?.releaseDate)}
                </p>
                {data?.movie?.trailerUrl && (
                  <button onClick={() => showModal2()}>Xem trailer</button>
                )}
              </div>
              <div className={styles.content_info_item_desc}>
                {data?.movie?.description}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.showTimes}>
          <div className={styles.showTimesBtn}>
            <button
              onClick={() => Toggle(1)}
              className={isActive == 1 ? styles.showTimesBtnActive : ""}
            >
              <BsCalendar />
              <span>Lịch chiếu</span>
            </button>
            <button
              onClick={() => Toggle(2)}
              className={isActive == 2 ? styles.showTimesBtnActive : ""}
            >
              <GiFilmSpool />
              <span>Các phim khác</span>
            </button>
            <button
              onClick={() => Toggle(3)}
              className={isActive == 3 ? styles.showTimesBtnActive : ""}
            >
              <span>Binh luan</span>
            </button>
          </div>
          <RenderShowTime />
          <div className={isActive == 2 ? styles.showFilmList : "hidden"}>
            <RelateMovie data={relateArr} />
          </div>
          <div className={isActive == 3 ? styles.showFilmList : "hidden"}>
            <Comente data={cometArr} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
