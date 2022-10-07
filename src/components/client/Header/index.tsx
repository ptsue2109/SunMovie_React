import {useState} from 'react'
import { Link } from 'react-router-dom'
import styles from './header.module.css'
import {BiSearch} from 'react-icons/bi'
import Navbar from './Navbar'
<<<<<<< HEAD
import config from '../../../config'
=======
import config from "../../../config"
>>>>>>> 3ba99aff02a7307880f29ea375d3e7d1dbd42409
type Props = {}

const ClientHeader = (props: Props) => {
  return (
    <>
      <div className={styles.headerWap}>
        <div className={`${styles.header}`}>
            <div className={styles.logo}>
              <Link to={config.routes.home}>
                  <img src="https://res.cloudinary.com/hungtv/image/upload/v1664432336/logo1_f9bumt.png" alt="" />    
              </Link> 
            </div>  
            {/* nav-bar */}
            <div className={styles.header_navbar}>
              <Navbar/>
            </div>
            <div className={styles.header_right}>
              <form>
                <div className={styles.header_right_btn}>
                  <BiSearch />
                </div>
              </form>
              <div className={styles.login}>
                <Link to={config.routes.signin}>Sign in</Link>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default ClientHeader