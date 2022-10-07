import { Modal } from "antd";
import React, { useState } from "react";
import styles from "./MovieDetail.module.css";
import { BsCalendar } from "react-icons/bs";
import { GiFilmSpool } from "react-icons/gi";
import { Link } from "react-router-dom";
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

  return (
    <>
      <Modal
        className="newStyle"
        title="Tên phim"
        width={950}
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <iframe
          width="900"
          height="500"
          src="https://www.youtube.com/embed/3xccmeAsy8g"
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
            <img
              src="https://chieuphimquocgia.com.vn/Content/Images/0016610_0.jpeg"
              alt=""
            />
          </div>
          <div className={styles.content_info}>
            <h3>KẺ SĂN LÙNG SỢ HÃI: TÁI SINH</h3>
            <div className={styles.content_info_items}>
              <div className={styles.content_info_item}>
                <p>
                  <span>Loại phim:</span> Kinh dị
                </p>
                <p>
                  <span>Thời lượng:</span> 90 phút
                </p>
                <p>
                  <span>Diễn viên:</span> Sydney Craven, Imran Adams, Jarreau
                  Benjamin,…
                </p>
                <p>
                  <span>Đạo diễn:</span> Timo Vuorensola
                </p>
                <p>
                  <span>Xuất xứ:</span> Mỹ
                </p>
                <p>
                  <span>Khởi chiếu:</span> 23/09/2022
                </p>
                <button onClick={() => showModal()}>Xem trailer</button>
              </div>
              <div className={styles.content_info_item_desc}>
                Kẻ Săn Lùng Sợ Hãi: Tái Sinh mở ra câu chuyện về Horror Hound
                Festival (Lễ hội Chó săn kinh dị) diễn ra lần đầu tiên tại
                Louisiana, lễ hội này thu hút hàng trăm người hâm mộ quái đản,
                có sở thích với những điều kinh dị từ khắp nơi tụ họp về. Trong
                số đó có fanboy Chase và bạn gái Laine - cô bị ép buộc đi vì
                phải chở bạn trai đến Louisiana. Khi sự kiện càng đến gần, Laine
                bắt đầu trải qua những linh cảm không thể giải thích được và
                trong tiềm thức cô thấy những viễn cảnh ghê rợn từng diễn ra tại
                thị trấn này, đặc biệt là về huyền thoại quỷ săn thịt người
                Creeper. Trong lúc diễn ra lễ hội, Laine cảm nhận được nhiều
                điều kì lạ, rùng rợn tại lễ hội này đang tập trung vào cô. Và cô
                chính là nhân vật được tế trong sự kiện đẫm máu lần này.
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
