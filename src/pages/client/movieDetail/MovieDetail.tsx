import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./MovieDetail.module.css";
import { BsCalendar } from "react-icons/bs";
import { GiFilmSpool } from "react-icons/gi";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getOneMovie } from "../../../redux/slice/Movie";
import { formatDate } from "../../../ultils";
type Props = {};

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
  const { oneMovie: data } = useAppSelector((state) => state.movie);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (() => {
      dispatch(getOneMovie(slug));
    })();
  }, []);
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
            <p>Ngày 03-10-2022</p>
            <div className={styles.showTimesListItem}>
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
            </div>
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
