
import { useEffect } from "react";
import { Skeleton } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import config from "../../../config";
import { CatePostMenu } from "../../../ultils/data";
import {ImNewspaper} from 'react-icons/im'
import { useAppSelector } from "../../../redux/hook";
type Props = {};

const NavNews = (props: Props) => {

  const {categories, isFetching} = useAppSelector((state:any) => state.categoriesReducer)
  const dispatch = useDispatch<any>();


  return (
    <section className="container max-w-6xl px-3 mx-auto flex mt-8 justify-center">
    {!isFetching && (
      <>
        <NavLink to={config.routes.news} className="cate-news-link">
          <div className={`text-center px-4 group flex flex-col items-center cate-news-item`}>
            <div className="cate-news-icon w-[75px] h-[75px] text-3xl rounded-full flex items-center justify-center bg-[#EEE8DF] transition duration-300 group-hover:bg-[#D9A953] group-hover:text-white cursor-pointer">
              <ImNewspaper/>
            </div>
            <p className="cate-news-name font-semibold mt-1 group-hover:text-[#D9A953] transition duration-300">
              Tất cả
            </p>
          </div>
        </NavLink>

        {categories?.map((item:any, index:any) => (
          <NavLink key={index} to={`${config.routes.news}/${item.slug}`} className="cate-news-link">
            <div className={`text-center px-4 group flex flex-col items-center cate-news-item`}>
              <div className="cate-news-icon w-[75px] h-[75px] text-3xl rounded-full flex items-center justify-center bg-[#EEE8DF] transition duration-300 group-hover:bg-[#D9A953] group-hover:text-white cursor-pointer">
                <ImNewspaper />
              </div>
              <p className="cate-news-name font-semibold mt-1 group-hover:text-[#D9A953] transition duration-300">
                {item.title}
              </p>
            </div>
          </NavLink>
        ))}
      </>
    )}

    {isFetching &&
      Array.apply(null, new Array(4)).map((_, index) => (
        <Skeleton  className="rounded-full mx-2" key={index} />
      ))}
  </section>
  );
};

export default NavNews;

