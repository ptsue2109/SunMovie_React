import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
type Props = {};

const SlideShow = (props: Props) => {
  const dispatch = useAppDispatch();
  const { slider, isErr, isFetching, isSucess } = useAppSelector(
    (state) => state.slider
  );
  return (
    <div className="banner">
      <Slide easing="ease">
        <div className="each-slide">
          {slider.map((item: any) => {
            <div>
              <img src={item.images} alt="" />
            </div>;
          })}
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/DaoDocDac_Slider.jpg)`,
            }}
          ></div>
        </div>
      </Slide>
    </div>
  );
};

export default SlideShow;
