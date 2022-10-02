import React from 'react'
import SlideShow from '../../../components/client/SlideShow/SlideShow'
import styles from './Home.module.css'
type Props = {}

const Home = (props: Props) => {
  return (
    <>
      <SlideShow/>
      <div className={styles.content}>
        <div className={styles.content_btn}>
          <button>Phim đang chiếu</button>
          <button>Phim sắp chiếu</button>
        </div>
      </div>
    </>
  )
}

export default Home