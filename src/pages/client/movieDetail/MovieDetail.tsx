import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./MovieDetail.module.css";
import { BsCalendar } from "react-icons/bs";
import { GiFilmSpool } from "react-icons/gi";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getOneMovie } from "../../../redux/slice/Movie";
import { formatDate } from "../../../ultils";
import { getAlSt } from "../../../redux/slice/ShowTimeSlice";
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import styled from "styled-components";
type Props = {};

let unique_arr = (arr: any[]) => {
  var newArr: any[] = [];
  newArr = arr.filter(function (item: any) {
    return newArr.includes(item) ? "" : newArr.push(item);
  });
  return newArr;
};

const MovieDetail = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setActive] = useState(1);

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
  const dispatch = useAppDispatch();
  useEffect(() => {
    (() => {
      dispatch(getOneMovie(slug));
    })();
  }, []);

  // thảo
  useEffect(() => {
    dispatch(getAlSt({}));
  }, []);

  let movieSelectId = data?.movie?._id;
  console.log(movieSelectId);

  const { seatsByST } = useAppSelector((state: any) => state.SeatBySTReducer);
  const { stList } = useAppSelector((state) => state?.ShowTimeReducer);
  let showtimes = seatsByST?.filter(
    (item: any) => item?.movieId?._id === movieSelectId
  );
  console.log("tất cả giờ chiếu", showtimes);
  let timeUnique = unique_arr(
    showtimes?.map((item: any) => item?.showTimeId?._id)
  );
  console.log('timeUnique', timeUnique);
  
  const renderDate = () => {
    let itemSelectTime: any[] = [];
    for (let key in stList) {
      for (let item in timeUnique) {
        if (stList[key]?._id === timeUnique[item]) {
          itemSelectTime.push(stList[key]);
        }
      }
    }
    return (
      <>
        {itemSelectTime &&
          itemSelectTime?.map((item: any, index: any) => (
            <div className={styles.showTimesListItem} key={index}>
              <p > {formatDate(item?.date)}</p>
              
            </div>
          ))}
      </>
    );
  };

  // lấy thông tin suất chiếu , tương tác vs showTimes
  const renderShowTimes = () => {
    let showTimes = [];
    for (let itemkey in showtimes) {
      for (let itemUniq in timeUnique) {
        let days = timeUnique[itemUniq];
        if (timeUnique[itemUniq] == showtimes[itemkey]?.showTimeId?._id) {
          showTimes = [days, showtimes[itemkey]?.showTimeId?.startAt];
          console.log("showTimes", showTimes);

          // console.log('date', date);
          // let groupByAge = date.reduce(
          //   (acc: any, it: any) => ({ ...acc[0], [it.date]: (acc[it.date] || 0) + date[1] }),
          //   {}
          // );
          // console.log('groupByAge0', groupByAge);
        }
      }
    }
    return (
      <>

      </>
    );
  };
  const onChange = (date: any, dateString: any) => {
    console.log(date, dateString);
  }
  if (data == "") return <div>Loading...</div>;
  return (
    <>
      <Modal
        className="newStyle"
        title={data?.name}
        width={950}
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <iframe
          width="900"
          height="500"
          src={`${data?.movie?.trailerUrl}`}
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
                  <button onClick={() => showModal()}>Xem trailer</button>
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
          </div>

          <div className={isActive == 1 ? styles.showTimesList : "hidden"}>

            {renderDate()}
            {renderShowTimes()}
            {/* <div className={styles.showTimesListItem}>
              <span>
                <Link to={`#`}>19:30</Link>
              </span>
              <span>
                <Link to={`#`}>19:30</Link>
              </span>
              <span>
                <Link to={`#`}>19:30</Link>
              </span>
              <span>
                <Link to={`#`}>19:30</Link>
              </span>
              <span>
                <Link to={`#`}>19:30</Link>
              </span>
              <span>
                <Link to={`#`}>19:30</Link>
              </span>
              <span>
                <Link to={`#`}>19:30</Link>
              </span>
              <span>
                <Link to={`#`}>19:30</Link>
              </span>
            </div> */}
          </div>

          <div className={isActive == 2 ? styles.showFilmList : "hidden"}>
            <div className={styles.showFilmListItem}>
              <Link to={`/d`}>
                <div className={styles.showFilmListItemImg}>
                  <img
                    src="https://chieuphimquocgia.com.vn/Content/Images/0016631_0.jpeg"
                    alt=""
                  />
                </div>
                <div className={styles.showFilmListItemInfo}>
                  <h3>ÔNG VUA TIẾNG CƯỜI</h3>
                </div>
              </Link>
            </div>
            <div className={styles.showFilmListItem}>
              <Link to={`/d`}>
                <div className={styles.showFilmListItemImg}>
                  <img
                    src="https://chieuphimquocgia.com.vn/Content/Images/0016631_0.jpeg"
                    alt=""
                  />
                </div>
                <div className={styles.showFilmListItemInfo}>
                  <h3>ÔNG VUA TIẾNG CƯỜI</h3>
                </div>
              </Link>
            </div>
            <div className={styles.showFilmListItem}>
              <Link to={`/d`}>
                <div className={styles.showFilmListItemImg}>
                  <img
                    src="https://chieuphimquocgia.com.vn/Content/Images/0016631_0.jpeg"
                    alt=""
                  />
                </div>
                <div className={styles.showFilmListItemInfo}>
                  <h3>ÔNG VUA TIẾNG CƯỜI</h3>
                </div>
              </Link>
            </div>
            <div className={styles.showFilmListItem}>
              <Link to={`/d`}>
                <div className={styles.showFilmListItemImg}>
                  <img
                    src="https://chieuphimquocgia.com.vn/Content/Images/0016631_0.jpeg"
                    alt=""
                  />
                </div>
                <div className={styles.showFilmListItemInfo}>
                  <h3>ÔNG VUA TIẾNG CƯỜI</h3>
                </div>
              </Link>
            </div>
            <div className={styles.showFilmListItem}>
              <Link to={`/d`}>
                <div className={styles.showFilmListItemImg}>
                  <img
                    src="https://chieuphimquocgia.com.vn/Content/Images/0016631_0.jpeg"
                    alt=""
                  />
                </div>
                <div className={styles.showFilmListItemInfo}>
                  <h3>ÔNG VUA TIẾNG CƯỜI</h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
const CustomDatePicker = styled(DatePicker)`
  td{height: 5px}
`