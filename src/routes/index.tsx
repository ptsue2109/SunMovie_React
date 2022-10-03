import { PropsWithChildren } from "react";
import configRoute from "../config";
import { AuthTheme } from "../themes";

import Home from "../pages/client/Home";
import Movie from "../pages/client/Movie";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import NotFoundPage from "../pages/NotFound";



type RoutesType = {
  path: string;
  component: (args: PropsWithChildren) => JSX.Element;
  layout?: any;
  title?: string;
};

export const publicRoutes: RoutesType[] = [
  { path: configRoute.routes.home, component: Home },
  { path: configRoute.routes.movie, component: Movie },
  { path: configRoute.routes.signin, component: SignIn,layout: AuthTheme },
  { path: configRoute.routes.signup, component: SignUp, layout: AuthTheme},
  { path: "*" , component: NotFoundPage , layout: null},
];
