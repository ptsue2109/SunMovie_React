import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getSlider } from "../../../redux/slice/Slider";
type Props = {};

const SlideShow = (props: Props) => {
  const dispatch = useAppDispatch();
  const { slider, isErr, isFetching, isSucess } = useAppSelector(
    (state) => state.slider
  );
  console.log(slider);

  return (
    <div className="banner">
      <Slide easing="ease">
        {slider.map((item: any) =>
          <div className="each-slide">
            <div >
              <Link to={item.url} title={item.title}>
                <img src={item.images[0].url} alt="" /></Link>
            </div>;
          </div>
        )}
        {/* <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/DaoDocDac_Slider.jpg)`,
            }}
          ></div>
        </div> */}
      </Slide>
    </div>
  );
};

export default SlideShow;
