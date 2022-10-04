import React from 'react'
import styles from './BookChair.module.css'
type Props = {}

const BookChair = (props: Props) => {
  return (
    <>
        <div className={styles.container}>
            <div className={styles.title}>
                <h3>Chọn ghế</h3>
                <p>Bạn đã chọn: <span>AVATAR 2</span> </p>
                <p>Phòng chiếu: 5</p>
                <p>Suất chiếu: 16:00 - 29/05/2022</p>
            </div>

        </div>
    </>
  )
}

export default BookChair