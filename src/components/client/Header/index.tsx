import {useState} from 'react'
import { Link } from 'react-router-dom'
import styles from './header.module.css'
import {BiSearch} from 'react-icons/bi'
type Props = {}

const ClientHeader = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={`${styles.header}`}>
          <div className={styles.logo}>
            <Link to={`/`}>
                <img src="https://res.cloudinary.com/hungtv/image/upload/v1664432336/logo1_f9bumt.png" alt="" />    
            </Link> 
          </div>  
          <div className={styles.header_navbar}>
            <nav>
              <ul>
                <li><Link to={`#`}>Trang chủ</Link></li>
                <li><Link to={`#`}>Phim</Link></li>
                <li><Link to={`#`}>Mua vé</Link></li>
                <li><Link to={`#`}>Giá vé</Link></li>
                <li><Link to={`#`}>Tin tức</Link></li>
                <li><Link to={`#`}>Hỗ trợ</Link></li>
              </ul>
            </nav>
          </div>
          <div className={styles.header_right}>
            <form>
              <div onClick={() => setOpen(true)} className={styles.header_right_btn}>
                <BiSearch />
              </div>
            </form>
            <div className={styles.login}>
              <Link to={`#`}>Sign in</Link>
            </div>
          </div>
      </div>
    </>
  )
}

export default ClientHeader