import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
type Props = {};

const SlideShow = (props: Props) => {
  const { slider, errMess } = useAppSelector((state) => state.slider);
  return (
    <div className="banner">
      <Slide easing="ease">
        {slider?.map((item: any, index: any) => (
          <div key={index}>
            <div
              style={{ backgroundImage: `url(${item?.images[0]?.url})` }}
            ></div>
            <span className="   limit-line-2 block my-1 pt-20 font-semibold text-center leading-tight transition duration-300 text-gray-600 hover:text-black uppercase ">
              {item.content}
            </span>
          </div>
        ))}
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
