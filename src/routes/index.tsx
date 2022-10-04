import { PropsWithChildren } from "react";
import configRoute from "../config";
import BookChair from "../containers/client/bookChair/BookChair";
import Home from "../containers/client/home/Home";
import Movie from "../containers/client/Movie";
import MovieDetail from "../containers/client/movieDetail/MovieDetail";
import Showtiem from "../containers/client/Showtime/Showtiem";
type RoutesType = {
  path: string;
  component: (args: PropsWithChildren) => JSX.Element;
  layout?: any;
  title?: string;
};

export const publicRoutes: RoutesType[] = [
  { path: configRoute.routes.home, component: Home },
  { path: configRoute.routes.movie, component: Movie },
  { path: configRoute.routes.detail, component: MovieDetail },
  { path: configRoute.routes.bookChair, component: BookChair },
  { path: configRoute.routes.showtime, component: Showtiem },
];
