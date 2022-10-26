import React, { useState } from "react";
import { Link } from "react-router-dom";
import SlideShow from "../../../components/client/SlideShow/SlideShow";
import styles from "./Home.module.scss";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useAppSelector } from "../../../redux/hook";
import { formatDate } from "../../../ultils";
import moment from "moment";
type Props = {};

const Home = (props: Props) => {
  const [isAcive, setActive] = useState(1);
  const Toggle = (number: number) => {
    setActive(number);
  };
  const { movie } = useAppSelector((state) => state.movie);
  // var dateToday = new Date(moment().format());
  // const data1 = movie.filter((item: any) => item.releaseDate <= dateToday);
  // console.log(data1, dateToday);

  return (
    <>
      <SlideShow />
      <div className={styles.content}>
        <div className={styles.content_btn}>
          <button
            onClick={() => Toggle(1)}
            className={isAcive == 1 ? styles.content_btn_active : ""}
          >
            Phim đang chiếu
          </button>
          <button
            onClick={() => Toggle(2)}
            className={isAcive == 2 ? styles.content_btn_active : ""}
          >
            Phim sắp chiếu
          </button>
        </div>
        {/* Home Page 1 */}
        <div className={isAcive == 1 ? styles.content_btn1 : "hidden"}>
          <div className={styles.content_list}>
            {movie?.map((item: any) => (
              <div className={styles.content_list_item} key={item._id}>
                <Link to={item.slug}>
                  <div className={styles.content_list_item_img}>
                    <img src={item.image[0].url} alt="" />
                  </div>
                  <div className={styles.content_list_item_info}>
                    <h3>{item.name}</h3>
                    <p>Thể loại: Kinh dị</p>
                    <p>Khởi chiếu: {formatDate(item.releaseDate)}</p>
                    <button>Đặt vé</button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* End Home Page 1 */}

        {/* Home page 2 */}
        <div className={isAcive == 2 ? styles.content_btn2 : "hidden"}>
          <div className={styles.content_list}>
            <div className={styles.content_list_item}>
              <div className={styles.content_list_item_img}>
                <img
                  src="https://chieuphimquocgia.com.vn/Content/Images/0016585_0.jpeg"
                  alt=""
                />
              </div>
              <div className={styles.content_list_item_info}>
                <h3>KẺ SĂN LÙNG SỢ HÃI: TÁI SINH</h3>
                <p>Thể loại: Kinh dị</p>
                <p>Khởi chiếu: 23/09/2022</p>
                <button>Đặt vé</button>
              </div>
            </div>
          </div>
        </div>
        {/* End Home Page 2 */}

        <Link to={`#`}>
          <div className={styles.more}>
            <p>Xem thêm</p>
            <span>
              <HiOutlineArrowNarrowRight />
            </span>
          </div>
        </Link>

        <div className={styles.content_news_cmt}>
          <div className={styles.content_news}>
            <h3>Tin tức</h3>
            <div className={styles.content_new_item}>
              <div>
                <img
                  src="https://chieuphimquocgia.com.vn/content/images/thumbs/0016628_215.jpeg"
                  alt=""
                />
              </div>
              <div className={styles.content_new_item_info}>
                <h4>
                  LIÊN HOAN PHIM ITALIA 2022 TẠI TRUNG TÂM CHIẾU PHIM QUỐC GIA
                  (03/10 - 09/10/2022)
                </h4>
                <div>
                  Đại sứ quán Italia tại Hà Nội hân hạnh giới thiệu “LIÊN HOAN
                  PHIM ITALIA 2022”, được tổ chức tại Sun Cinema từ ngày
                  3.10.2022- 9.10.2022
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content_cmt}>
            <h3>Bình luận phim</h3>
          </div>
        </div>

        <div className={styles.discountNews}>
          <h3>Tin khuyến mãi</h3>
          <div className={styles.discountNewsItems}>
            <div className={styles.discountNewsItem}>
              <img
                src="https://cdn.galaxycine.vn/media/2022/9/19/back2shool-digital-300x450_1663573378238.jpg"
                alt=""
              />
              <div className={styles.discountNewsItemInfo}>
                <h4>Nhận vé miễn phí</h4>
                <p>
                  Nhận ngay vé MIỄN PHÍ & mua 01 tặng 01 & Combo bắp nước chỉ
                  bằng một thao tác đơn giản!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
