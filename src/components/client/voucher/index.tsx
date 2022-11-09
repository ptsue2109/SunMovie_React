import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import styles from "./voucher.module.scss";

import { getAlVc } from "../../../redux/slice/voucherSlice";
type Props = {}

const Voucher = (props: any) => {
  const dispacth = useAppDispatch()
  useEffect(() => {
    dispacth(getAlVc())
  }, [])
  const { vouchers } = useAppSelector((state) => state.voucherReducer)
  return (
    <>
      <div className={styles.discountNewsItems}>
        {vouchers && vouchers.map((item: any) => (
         <div key={item?._id}>
          <div style={{ backgroundImage: `url(${item?.imagesFile[0]?.url}) ` }} className={styles.discountNewsItem}>
            <div className={styles.discountNewsItemInfo}>
              <h4>{item?.content}</h4>
              <p>
                {item?.content}
              </p>
            </div>
          </div>
         </div>
        ))}


      </div>


    </>
  )
}

export default Voucher