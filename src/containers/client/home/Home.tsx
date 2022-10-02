import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SlideShow from '../../../components/client/SlideShow/SlideShow'
import styles from './Home.module.css'
import {HiOutlineArrowNarrowRight} from "react-icons/hi"
type Props = {}

const Home = (props: Props) => {
  const [isAcive,setActive] =useState(1);
  const Toggle = (number:number)=>{
    setActive(number);
  }
  return (
    <>
      <SlideShow/>
      <div className={styles.content}>
        <div className={styles.content_btn}>
          <button onClick={()=>Toggle(1)} className={isAcive==1?styles.content_btn_active:""}>Phim đang chiếu</button>
          <button onClick={()=>Toggle(2)} className={isAcive==2?styles.content_btn_active:""}>Phim sắp chiếu</button>
        </div>
        {/* Home Page 1 */}
        <div className={isAcive==1?styles.content_btn1:"hidden"}>
          <div className={styles.content_list}>
            <div className={styles.content_list_item}>
              <div className={styles.content_list_item_img}>
                <img src="https://chieuphimquocgia.com.vn/Content/Images/0016610_0.jpeg" alt="" />
              </div>
              <div className={styles.content_list_item_info}>
                <h3>KẺ SĂN LÙNG SỢ HÃI: TÁI SINH</h3>
                <p>Thể loại: Kinh dị</p>
                <p>Khởi chiếu: 23/09/2022</p>
                <button>Đặt vé</button>
              </div>
            </div>
            <div className={styles.content_list_item}>
              <div className={styles.content_list_item_img}>
                <img src="https://chieuphimquocgia.com.vn/Content/Images/0016610_0.jpeg" alt="" />
              </div>
              <div className={styles.content_list_item_info}>
                <h3>KẺ SĂN LÙNG SỢ HÃI: TÁI SINH</h3>
                <p>Thể loại: Kinh dị</p>
                <p>Khởi chiếu: 23/09/2022</p>
                <button>Đặt vé</button>
              </div>
            </div>
            <div className={styles.content_list_item}>
              <div className={styles.content_list_item_img}>
                <img src="https://chieuphimquocgia.com.vn/Content/Images/0016610_0.jpeg" alt="" />
              </div>
              <div className={styles.content_list_item_info}>
                <h3>KẺ SĂN LÙNG SỢ HÃI: TÁI SINH</h3>
                <p>Thể loại: Kinh dị</p>
                <p>Khởi chiếu: 23/09/2022</p>
                <button>Đặt vé</button>
              </div>
            </div>
            <div className={styles.content_list_item}>
              <div className={styles.content_list_item_img}>
                <img src="https://chieuphimquocgia.com.vn/Content/Images/0016610_0.jpeg" alt="" />
              </div>
              <div className={styles.content_list_item_info}>
                <h3>KẺ SĂN LÙNG SỢ HÃI: TÁI SINH</h3>
                <p>Thể loại: Kinh dị</p>
                <p>Khởi chiếu: 23/09/2022</p>
                <button>Đặt vé</button>
              </div>
            </div>
            <div className={styles.content_list_item}>
              <div className={styles.content_list_item_img}>
                <img src="https://chieuphimquocgia.com.vn/Content/Images/0016610_0.jpeg" alt="" />
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
        {/* End Home Page 1 */}

        {/* Home page 2 */}
        <div className={isAcive==2?styles.content_btn2:"hidden"}>
          <div className={styles.content_list}>
            <div className={styles.content_list_item}>
              <div className={styles.content_list_item_img}>
                <img src="https://chieuphimquocgia.com.vn/Content/Images/0016585_0.jpeg" alt="" />
              </div>
              <div className={styles.content_list_item_info}>
                <h3>KẺ SĂN LÙNG SỢ HÃI: TÁI SINH</h3>
                <p>Thể loại: Kinh dị</p>
                <p>Khởi chiếu: 23/09/2022</p>
                <button>Đặt vé</button>
              </div>
            </div>
            <div className={styles.content_list_item}>
              <div className={styles.content_list_item_img}>
                <img src="https://chieuphimquocgia.com.vn/Content/Images/0016585_0.jpeg" alt="" />
              </div>
              <div className={styles.content_list_item_info}>
                <h3>KẺ SĂN LÙNG SỢ HÃI: TÁI SINH</h3>
                <p>Thể loại: Kinh dị</p>
                <p>Khởi chiếu: 23/09/2022</p>
                <button>Đặt vé</button>
              </div>
            </div>
            <div className={styles.content_list_item}>
              <div className={styles.content_list_item_img}>
                <img src="https://chieuphimquocgia.com.vn/Content/Images/0016610_0.jpeg" alt="" />
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
            <span><HiOutlineArrowNarrowRight/></span>
          </div>
        </Link>

        <div className={styles.content_news_cmt}>
          <div className={styles.content_news}>
            <h3>Tin tức</h3>
            <div className={styles.content_new_item}>
              <div>
                <img src="https://chieuphimquocgia.com.vn/content/images/thumbs/0016628_215.jpeg" alt="" />
              </div>
              <div className={styles.content_new_item_info}>
                <h4>LIÊN HOAN PHIM ITALIA 2022 TẠI TRUNG TÂM CHIẾU PHIM QUỐC GIA (03/10 - 09/10/2022)</h4>
                <div>
                  Đại sứ quán Italia tại Hà Nội hân hạnh giới thiệu “LIÊN HOAN PHIM ITALIA 2022”, được tổ chức tại Trung tâm Chiếu phim Quốc gia Hà Nội từ ngày 3.10.2022- 9.10.2022
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content_cmt}>
            <h3>Bình luận phim</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home