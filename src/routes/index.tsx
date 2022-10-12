import React, { PropsWithChildren } from "react";
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
import AdminUserList from "../pages/admin/User/List";
import CreateMovieType from "../pages/admin/MovieType/CreateMovieType";
import UserCreate from "../pages/admin/User/Create";
import UserEdit from "../pages/admin/User/Update";
import ListMovieType from "../pages/admin/MovieType/ListMovieType";
import ListAddminTicket from "../pages/admin/Ticket/ListTicket";
import CreateTicket from "../pages/admin/Ticket/Create";
import UploadTicket from "../pages/admin/Ticket/Upload";
import ListTicketPrice from "../pages/admin/Ticket/ListTicketPrice";
import CreateTicketPrice from "../pages/admin/Ticket/CreateTicketPrice";
import UploadTicketPrice from "../pages/admin/Ticket/UploadTicketPrice";
import ListSeatType from "../pages/admin/SeatType/ListSeatType";
import CeateSeatType from "../pages/admin/SeatType/CeateSeatType";
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
  { path: configRoute.routes.adminMovieTypeAdd, component: CreateMovieType },
  { path: configRoute.routes.adminUserAdd, component: UserCreate },
  { path: configRoute.routes.adminUserUpdate, component: UserEdit },
  { path: configRoute.routes.adminMovieType, component: ListMovieType },
  { path: configRoute.routes.adminListTicket, component: ListAddminTicket },
  { path: configRoute.routes.adminTicketAdd, component: CreateTicket },
  { path: configRoute.routes.adminTicketUpdate, component: UploadTicket },
  { path: configRoute.routes.adminTicketPrice, component: ListTicketPrice },
  {
    path: configRoute.routes.adminTicketPriceUpdate,
    component: UploadTicketPrice,
  },
  {
    path: configRoute.routes.adminTicketPriceAdd,
    component: CreateTicketPrice,
  },
  { path: configRoute.routes.adminSeatType, component: ListSeatType },
  { path: configRoute.routes.adminSeatTypeAdd, component: CeateSeatType },
];
