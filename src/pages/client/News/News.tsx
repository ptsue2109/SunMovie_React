import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavNews from "../../../components/client/NavNews";
import NewsContent from "../../../components/client/NewsContent";
import config from "../../../config";
import "./News.module.scss"
import { useAppSelector } from "../../../redux/hook";
import { getAlPost, getListPostByCate } from "../../../redux/slice/PostSlice";

type Props = {
  activeNav: boolean
};

const News = ({activeNav}: Props) => {
  const { posts } = useAppSelector((state: any) => state.PostReducer);
  console.log('posts', posts);

  const dispatch = useDispatch<any>();
  const { slug } = useParams();
  const [path, setPath] = useState<string>("");
  const [data, setData] = useState<any>([]);
  console.log('data', data);
  
  useEffect(() => {
    if (!slug) {
      setPath(config.routes.news);
      document.title = "News";
      (async () => {
        try {
          await dispatch(getAlPost()).unwrap();
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      setPath(`${config.routes.news}/${slug}`);
      (async () => {
        try {
          const res = await dispatch(getListPostByCate(slug)).unwrap();
          console.log('res', res?.posts);
          setData(res?.posts)
       
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [slug]);
  return (
    <>
     { !activeNav && <NavNews />}
      {!slug && <NewsContent newsList={posts} path={path} />}
      {slug && <NewsContent newsList={data} path={path} />}
    </>
  );
};

export default News;
