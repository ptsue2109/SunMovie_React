import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavNews from "../../../components/client/NavNews";
import NewsContent from "../../../components/client/NewsContent";
import config from "../../../config";

import { useAppSelector } from "../../../redux/hook";
// import { getBySlug, getPosts, selectPaginationPost, selectPosts } from "../../../redux/postSlice";


type Props = {};

const News = (props: Props) => {
  const {posts} = useAppSelector((state:any) => state.PostReducer)
//   const pagination = useSelector(selectPaginationPost);
  const dispatch = useDispatch<any>();
  const { slug, page } = useParams();
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    if (!slug) {
      setPath(config.routes.news);
      document.title = "News";

     
    } else {
      setPath(`${config.routes.news}/${slug}`);

      
    }
  }, [slug, page]);

  return (
    <>
      <NavNews />
      <NewsContent newsList={posts}  path={path} />
    </>
  );
};

export default News;
