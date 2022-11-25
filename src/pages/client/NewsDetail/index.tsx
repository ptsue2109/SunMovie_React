import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import NewsSidebar from "../../../components/client/NewsSidebar";
import config from "../../../config";
import { useAppSelector } from "../../../redux/hook";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const NewsDetail = () => {
  const { slug } = useParams();
  const { posts } = useAppSelector((state: any) => state.PostReducer);
  const dataSelected = posts?.find((item: any) => item?.slug === slug);
  const { loading } = useAppSelector((state: any) => state.PostReducer);
  return (
    <>
      {!loading && (
        <section className="container max-w-6xl mx-auto px-3 text-center pt-7  text-gray-300">
          <div className="border-b border-dashed pb-7 ">
            <Link to={`/categories/${dataSelected?.categoryId?.slug}`}>
              <span className="uppercase text-sm ">
                {dataSelected?.categoryId?.title}
              </span>
            </Link>
            <h1 className="uppercase font-bold text-xl py-1 text-[#D9A953] ">
              {dataSelected?.title}
            </h1>
            <p className="text-sm">
              POSTED ON {moment(dataSelected?.createdAt).format("DD/MM/YYYY")}{" "}
              BY {dataSelected?.userId?.username}
            </p>
          </div>
        </section>
      )}

      {/* loading */}
      {loading && (
        <div className="container max-w-6xl mx-auto px-3 text-center pt-7 border-b border-dashed pb-7">
          <Skeleton className="w-[20%]" />
          <Skeleton height={25} className="my-1" />
          <Skeleton className="w-[40%]" />
        </div>
      )}

      <section className="container max-w-6xl mx-auto px-3 grid grid-cols-12 pb-8 pt-4 text-white max-h-[500px] h-[500px]">
        <div className="col-span-12 lg:col-span-9 lg:pr-6">
          {!loading && (
            <div className="leading-relaxed text-justify">
              <div className="">
                {dataSelected?.imagesFile && (
                  <img
                    src={
                      dataSelected?.imagesFile[0]?.url ??
                      `${import.meta.env.VITE_DEFAULT_IMG}`
                    }
                    alt=""
                    className="w-full bg-center bg-cover bg-no-repeat mb-4 max-h-[350px]"
                  />
                )}
              </div>
              <div className="">
                <div
                  dangerouslySetInnerHTML={{ __html: dataSelected?.desc }}
                  className="news__desc text-gray-400"
                ></div>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: dataSelected?.content }}
                className="news__content"
              ></div>
            </div>
          )}

          {loading && (
            <div>
              <Skeleton className="pt-[50%]" />
              <Skeleton count={10} />
            </div>
          )}

          {!loading && (
            <ul className="flex justify-center py-7">
              <li className="mx-0.5">
                <a
                  onClick={() => {
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}/`,
                      "",
                      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
                    );
                  }}
                  className="hover-text-white w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                >
                  <FaFacebook />
                </a>
              </li>
              <li className="mx-0.5">
                <a
                  onClick={() => {
                    window.open(
                      `https://twitter.com/share?url=${window.location.href}`,
                      "",
                      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
                    );
                  }}
                  className="hover-text-white w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                >
                  <FaTwitter />
                </a>
              </li>
              <li className="mx-0.5">
                <a
                  onClick={() => {
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}/`,
                      "",
                      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
                    );
                  }}
                  className="hover-text-white w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                >
                  <FaLinkedin />
                </a>
              </li>
            </ul>
          )}

          {loading && (
            <div className="flex justify-center py-7">
              <div className="mt-2 flex">
                <Skeleton circle width={32} height={32} className="mr-2" />
                <Skeleton circle width={32} height={32} className="mr-2" />
                <Skeleton circle width={32} height={32} className="mr-2" />
              </div>
            </div>
          )}
        </div>

        <div className=" col-span-24 lg:col-span-3 lg:pr-4">
          <NewsSidebar />
        </div>
      </section>
    </>
  );
};

export default NewsDetail;
