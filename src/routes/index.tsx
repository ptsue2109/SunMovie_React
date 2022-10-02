import { PropsWithChildren } from "react";
import configRoute from "../config";
import Home from "../containers/client/home/Home";
import Movie from "../containers/client/Movie";
type RoutesType = {
   path: string;
   component: (args: PropsWithChildren) => JSX.Element;
   layout?: any;
   title?: string;
 };

export const publicRoutes : RoutesType[] = [
   { path: configRoute.routes.home, component: Home },
   { path: configRoute.routes.movie, component: Movie },
]