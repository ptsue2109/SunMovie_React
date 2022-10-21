import { UserOutlined, PieChartOutlined } from "@ant-design/icons";
import {BiCategory} from 'react-icons/bi';
import {HiOutlineTicket} from 'react-icons/hi';
import {MdEventSeat} from 'react-icons/md';
import {GiTheater} from "react-icons/gi"
import {FcOvertime} from 'react-icons/fc'
import { Menu } from "antd";
import type { MenuProps } from "antd/es/menu";
import React from "react";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
import config from "../../../config";
const { SubMenu } = Menu;

type Props = {};
const items: MenuItem[] = [
  getItem(<Link to="/admin">Thống kê</Link>, "link", <PieChartOutlined />),
  getItem("Quản lí người dùng", "adminUser", <UserOutlined />, [
    getItem(<Link to={config.routes.adminUserList}> Danh sách người dùng</Link>,"adminUser1"),
    getItem(<Link to={config.routes.adminUserAdd}> Thêm người dùng</Link>, "adminUser2"),
  ]),
  getItem("Quản lí thể loại phim", "adminMovieType", <BiCategory />, [
    getItem(<Link to={config.routes.adminMovieType}> Danh sách thể loại</Link>,"adminMovieType5"),
    getItem( <Link to={config.routes.adminMovieTypeAdd}> Thêm thể loại</Link>, "adminMovieType6"),
  ]),
  getItem("Quản lí Vé Xem phim", "adminListTicket", <HiOutlineTicket />, [
    getItem(<Link to={config.routes.adminListTicket}> Danh sách Vé Xem phim</Link>,"adminListTicket7"),
    getItem(<Link to={config.routes.adminTicketAdd}> Thêm Vé</Link>, "adminListTicket8"),
  ]),
  getItem("Quản lí Vé", "adminTicketPrice", <UserOutlined />, [
    getItem(<Link to={config.routes.adminTicketPrice}> Danh sách Vé Xem phim</Link>,"adminTicketPrice9"),
    getItem(<Link to={config.routes.adminTicketPriceAdd}> Thêm Vé</Link>, "adminTicketPrice10"),
  ]),
  getItem("Quản lí Loại Ghế", "adminSeatType", <MdEventSeat />, [
    getItem(<Link to={config.routes.adminSeatType}> Danh sách loại ghế</Link>,"adminSeatType1"),
    getItem(<Link to={config.routes.adminSeatTypeAdd}> Thêm ghế</Link>, "adminSeatType2"),
  ]),
  getItem("Quản lí Phòng chiếu", "adminRooms", <GiTheater />, [
    getItem(<Link to={config.routes.adminRooms}> Danh sách rạp</Link>,"adminRooms1"),
    getItem(<Link to={config.routes.adminRoomsCreate}> Thêm rạp</Link>, "adminRooms2"),
  ]),
  getItem("Quản lí Giờ chiếu", "AdminShowTimes", <FcOvertime />, [
    getItem(<Link to={config.routes.AdminShowTimes}> Xem Giờ chiếu</Link>,"AdminShowTimes1"),
    getItem(<Link to={config.routes.AdminShowTimesCreate}> Thêm giờ chiếu</Link>, "AdminShowTimes2"),
  ]),
  getItem("Quản lí Format Film", "AdminFilmFormat", <FcOvertime />, [
    getItem(<Link to={config.routes.AdminFilmFormat}> Xem tất cả</Link>,"AdminFilmFormat1")
  ]),

  getItem("Quản lí phim ", "sub7", <UserOutlined />, [
    getItem(
      <Link to={config.routes.adminMovie}> Danh sách phim</Link>,
      "13"
    ),
    getItem(<Link to={config.routes.adminMoviecCreat}> Thêm phim</Link>, "14"),
  ]),
];
const MenuAdminLayout = (props: Props) => {
  return (
    <Menu
      theme="dark"
      style={{ width: 256 }}
      defaultSelectedKeys={["link"]}
      defaultOpenKeys={["link"]}
      items={items}
      mode="inline"
    />
  );
};

export default MenuAdminLayout;
