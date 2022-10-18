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

import EditMovieType from "../pages/admin/MovieType/EditMovieType";
import ListMovieType from "../pages/admin/MovieType/ListMovieType";
import CreateMovieType from "../pages/admin/MovieType/CreateMovieType";

import ListSeats from "../pages/admin/Seat/List"
import CreatSeats from "../pages/admin/Seat/Create"
import EditSeats from "../pages/admin/Seat/Edit"

import List from "../pages/admin/Rooms/List";
import Create from "../pages/admin/Rooms/Create";
import Edit from "../pages/admin/Rooms/Edit"

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
  { path: configRoute.routes.dashboard, component: Dashboard, title: "Dashboard" },

  { path: configRoute.routes.adminUserList, component: AdminUserList, title: "users" },
  { path: configRoute.routes.adminUserAdd, component: UserCreate, title: "users/create" },
  { path: configRoute.routes.adminUserUpdate, component: UserEdit, title: "users/update" },

  { path: configRoute.routes.adminMovieTypeAdd, component: CreateMovieType },
  { path: configRoute.routes.adminMovieType, component: ListMovieType },
  { path: configRoute.routes.adminMovieTypeEdit, component: EditMovieType },

  { path: configRoute.routes.adminSeatList, component: ListSeats, title: "seats" },
  { path: configRoute.routes.adminSeatCreate, component: CreatSeats, title: "seats/create" },
  { path: configRoute.routes.adminSeatEdit, component: EditSeats, title: "seats/update" },

  { path: configRoute.routes.adminSeatList, component: ListSeats, title: "seats" },
  { path: configRoute.routes.adminSeatCreate, component: CreatSeats, title: "seats/create" },
  { path: configRoute.routes.adminSeatEdit, component: EditSeats, title: "seats/update" },

  { path: configRoute.routes.adminRoom, component: List, title: "rooms" },
  { path: configRoute.routes.adminRoomCreate, component: Create, title: "rooms/create" },
  { path: configRoute.routes.adminRoomEdit, component: Edit, title: "rooms/update" },
];
