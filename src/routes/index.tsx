import { PropsWithChildren } from "react";
import configRoute from "../config";
import { AuthTheme } from "../themes";

import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import NotFoundPage from "../pages/NotFound";

import BookChair from "../pages/client/bookChair/BookChair";
import Home from "../pages/client/home/Home";
import MovieDetail from "../pages/client/movieDetail/MovieDetail";
import TickitPrice from "../pages/client/TickitPrice/TickitPrice";

// admin
import Dashboard from "../pages/admin/Dashboard";
import AdminUserList from "../pages/admin/User/List"



type RoutesType = {
  path: string;
  component: (args: PropsWithChildren) => JSX.Element;
  layout?: any;
  title?: string;
};

export const publicRoutes: RoutesType[] = [
  { path: configRoute.routes.signin, component: SignIn, layout: AuthTheme },
  { path: configRoute.routes.signup, component: SignUp, layout: AuthTheme },
  { path: configRoute.routes.home, component: Home },
  { path: configRoute.routes.detail, component: MovieDetail },
  { path: configRoute.routes.bookChair, component: BookChair },
  { path: configRoute.routes.tickitPrice, component: TickitPrice },
  { path: "*", component: NotFoundPage, layout: null },
];



export const privateRoutes: RoutesType[] = [
  { path: configRoute.routes.dashboard, component: Dashboard },
  { path: configRoute.routes.adminUserList, component: AdminUserList },
  
];

