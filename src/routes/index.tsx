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
import UserCreate from "../pages/admin/User/Create";
import UserEdit from "../pages/admin/User/Update";

import CreateMovieType from "../pages/admin/MovieType/CreateMovieType";
import ListMovieType from "../pages/admin/MovieType/ListMovieType";

import ListAddminTicket from "../pages/admin/Ticket/ListTicket";
import CreateTicket from "../pages/admin/Ticket/Create";
import UploadTicket from "../pages/admin/Ticket/Upload";
import ListTicketPrice from "../pages/admin/Ticket/ListTicketPrice";
import CreateTicketPrice from "../pages/admin/Ticket/CreateTicketPrice";
import UploadTicketPrice from "../pages/admin/Ticket/UploadTicketPrice";

import ListSeatType from "../pages/admin/SeatType/ListSeatType";
import CeateSeatType from "../pages/admin/SeatType/CeateSeatType";
import UploadSeatType from "../pages/admin/SeatType/UploadSeatType";

import ListCategories from "../pages/admin/categories/List";
import EditMovieType from "../pages/admin/MovieType/EditMovieType";
import CreateCategory from "../pages/admin/categories/Create";

import AdminRoomList from "../pages/admin/Rooms/List";
import AdminRoomCreate from "../pages/admin/Rooms/Create";
import AdminRoomEdit from "../pages/admin/Rooms/Edit";
import AdminShowTimeList from "../pages/admin/showTime/List";
import AdminShowTimesCreate from "../pages/admin/showTime/Create";
import AdminShowTimesEdit from "../pages/admin/showTime/Edit";
import FilmFormatList from "../pages/admin/FilmFormat/List";
import ShowTimeSeat from "../pages/admin/showTime/ShowTimeSeat";
import CreateMovie from "../pages/admin/Movie/CreateMovie";
import ListMovie from "../pages/admin/Movie/ListMovie";
import UpdateMovies from "../pages/admin/Movie/UpdateMovie";
import News from "../pages/client/News/News";

import AdminVoucherList from "../pages/admin/voucher/List";
import AdminVoucherCreate from "../pages/admin/voucher/Create";
import AdminVoucherEdit from "../pages/admin/voucher/Edit";

import AdminPosts from "../pages/admin/Post/index";
import AdminPostsCreate from "../pages/admin/Post/Create";
import AdminPostsEdit from "../pages/admin/Post/Edit";
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
  { path: configRoute.routes.news, component: News },
  { path: "*", component: NotFoundPage, layout: null },
];

export const privateRoutes: RoutesType[] = [
  { path: configRoute.routes.dashboard, component: Dashboard },

  { path: configRoute.routes.adminUserList, component: AdminUserList },
  { path: configRoute.routes.adminUserAdd, component: UserCreate },
  { path: configRoute.routes.adminUserUpdate, component: UserEdit },

  { path: configRoute.routes.adminMovieTypeEdit, component: EditMovieType },
  { path: configRoute.routes.adminMovieTypeAdd, component: CreateMovieType },
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
  { path: configRoute.routes.adminSeatTypeUpdate, component: UploadSeatType },

  { path: configRoute.routes.adminCategories, component: ListCategories },
  { path: configRoute.routes.adminCategoriesCreate, component: CreateCategory },
  { path: configRoute.routes.adminMoviecCreat, component: CreateMovie },
  { path: configRoute.routes.adminMovie, component: ListMovie },
  { path: configRoute.routes.adminMoviecUpdate, component: UpdateMovies },

  { path: configRoute.routes.adminRooms, component: AdminRoomList },
  { path: configRoute.routes.adminRoomsCreate, component: AdminRoomCreate },
  { path: configRoute.routes.adminRoomEdit, component: AdminRoomEdit },

  { path: configRoute.routes.AdminShowTimes, component: AdminShowTimeList },
  {
    path: configRoute.routes.AdminShowTimesCreate,
    component: AdminShowTimesCreate,
  },
  {
    path: configRoute.routes.AdminShowTimesEdit,
    component: AdminShowTimesEdit,
  },
  { path: configRoute.routes.AdminShowTimeSeat, component: ShowTimeSeat },

  { path: configRoute.routes.AdminFilmFormat, component: FilmFormatList },

  { path: configRoute.routes.AdminVouchers, component: AdminVoucherList },
  { path: configRoute.routes.AdminVouchersCreate, component: AdminVoucherCreate },
  { path: configRoute.routes.AdminVouchersEdit, component: AdminVoucherEdit },

  { path: configRoute.routes.AdminPosts, component: AdminPosts },
  { path: configRoute.routes.AdminPostsCreate, component: AdminPostsCreate },
  { path: configRoute.routes.AdminPostsEdit, component: AdminPostsEdit },
];
