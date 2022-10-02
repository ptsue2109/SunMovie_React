import React from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
type Props = {}

const SlideShow = (props: Props) => {
  return (
    <div className='banner'>
      <Slide easing="ease">
          <div className="each-slide">
              <div style={{ 'backgroundImage': `url(https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/Minions_Slider.jpg)` }}>
                
              </div>
          </div>
          <div className="each-slide">
              <div style={{ 'backgroundImage': `url(https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/DaoDocDac_Slider.jpg)` }}>
              </div>
          </div>
          <div className="each-slide">
              <div style={{ 'backgroundImage': `url(https://cdn.galaxycine.vn/media/2022/8/30/1_1661866507121.jpg)` }}>
              </div>
          </div>
      </Slide>
      
    </div>
  )
}

export default SlideShow