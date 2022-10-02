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

        
        <Link to={`#`}>
          <div className={styles.more}>
            <p>Xem thêm</p>
            <span><HiOutlineArrowNarrowRight/></span>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Home