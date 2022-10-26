import { Link } from "react-router-dom";
import { Skeleton } from 'antd';
import { formatDate } from "../../../ultils";
import { useSelector } from "react-redux";

import {ImNewspaper} from 'react-icons/im'
type NewsContentProps = {
  newsList?: any[];
  pagination?: { totalPage: number; limit: number; currentPage: number };
  path: string;
};

const NewsContent = ({ newsList, pagination, path }: NewsContentProps) => {
  const loading = false

  return (
    <section className="py-16 bg-[#EFE8DE] mt-6 min-h-[500px]">
    <div className="container max-w-6xl mx-auto px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {!loading &&
        newsList?.map((item, index) => (
          <div key={index}>
            <Link to={`/${item.slug}`}>
              <div
                style={{
                  backgroundImage: `url(${item.thumbnail})`,
                }}
                className="block bg-cover bg-center pt-[70%] rounded-t-xl relative"
              >
                <button className="absolute top-2 left-2 bg-[#D9A953] rounded-full w-10 h-10 text-white text-lg">
                  <ImNewspaper />
                </button>
              </div>
            </Link>

            <div className="bg-white rounded-b-xl shadow px-3 py-2">
              <p className="text-sm text-gray-500">{formatDate(item.createdAt)}</p>
              <h3>
                <Link to={`/${item.slug}`}>
                  <span className="limit-line-2 block my-1 font-semibold text-justify leading-tight transition duration-300 text-gray-600 hover:text-black">
                    {item.title}
                  </span>
                </Link>
              </h3>
              <div className="limit-line-3 text-gray-500 text-sm text-justify">{item.description}</div>
              <Link to={`/${item.slug}`}>
                <button className="block mx-auto w-9 h-9 rounded-full border-2 border-[#D9A953] text-[#D9A953] transition duration-300 hover:bg-[#D9A953] hover:text-white mt-5 mb-2">
                  <ImNewspaper />
                </button>
              </Link>
            </div>
          </div>
        ))}

      {loading &&
        Array.apply(null, new Array(8)).map((_, index) => (
          <div key={index}>
            <Skeleton className="pt-[60%] rounded-tl-lg rounded-tr-lg" />

            <div className="bg-white p-2 -mt-1 rounded-bl-lg rounded-br-lg text-center">
              <Skeleton  loading={loading} active avatar/>
              <Skeleton  className="my-2" />
            </div>
          </div>
        ))}
    </div>

   
    {loading && (
      <div className="mx-auto w-[25%] mt-5">
        <Skeleton className="mx-auto" />
      </div>
    )}
  </section>
  );
};

export default NewsContent;
