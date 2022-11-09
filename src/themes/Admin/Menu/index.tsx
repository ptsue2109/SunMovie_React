import { UserOutlined, PieChartOutlined ,SettingOutlined} from "@ant-design/icons";
import { BiCategory } from 'react-icons/bi';
import { HiOutlineTicket } from 'react-icons/hi';
import { MdEventSeat } from 'react-icons/md';
import { GiTheater } from "react-icons/gi"
import { FcOvertime } from 'react-icons/fc'
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
const items: any[] = [
  getItem(<Link to="/admin">Thống kê</Link>, "link", <PieChartOutlined />),
  getItem("Quản lí người dùng", "adminUser", <UserOutlined />, [
    getItem(<Link to={config.routes.adminUserList}> Danh sách người dùng</Link>, "adminUser1"),
    getItem(<Link to={config.routes.adminUserAdd}> Thêm người dùng</Link>, "adminUser2"),
  ]),
  getItem("Quản lí thể loại phim", "adminMovieType", <BiCategory />, [
    getItem(<Link to={config.routes.adminMovieType}> Danh sách thể loại</Link>, "adminMovieType5"),
    getItem(<Link to={config.routes.adminMovieTypeAdd}> Thêm thể loại</Link>, "adminMovieType6"),
  ]),
  getItem("Quản lí Vé Xem phim", "adminListTicket", <HiOutlineTicket />, [
    getItem(<Link to={config.routes.adminListTicket}> Danh sách Vé Xem phim</Link>, "adminListTicket7"),
    getItem(<Link to={config.routes.adminTicketAdd}> Thêm Vé</Link>, "adminListTicket8"),
  ]),
  getItem("Quản lí Vé", "adminTicketPrice", <UserOutlined />, [
    getItem(<Link to={config.routes.adminTicketPrice}> Danh sách Vé Xem phim</Link>, "adminTicketPrice9"),
    getItem(<Link to={config.routes.adminTicketPriceAdd}> Thêm Vé</Link>, "adminTicketPrice10"),
  ]),
  getItem("Quản lí Loại Ghế", "adminSeatType", <MdEventSeat />, [
    getItem(<Link to={config.routes.adminSeatType}> Danh sách loại ghế</Link>, "adminSeatType1"),
    getItem(<Link to={config.routes.adminSeatTypeAdd}> Thêm ghế</Link>, "adminSeatType2"),
  ]),
  getItem("Quản lí Phòng chiếu", "adminRooms", <GiTheater />, [
    getItem(<Link to={config.routes.adminRooms}> Danh sách phòng chiếu</Link>, "adminRooms1"),
    getItem(<Link to={config.routes.adminRoomsCreate}> Thêm phòng chiếu</Link>, "adminRooms2"),
  ]),
  getItem("Quản lí Giờ chiếu", "AdminShowTimes", <FcOvertime />, [
    getItem(<Link to={config.routes.AdminShowTimes}> Xem Giờ chiếu</Link>, "AdminShowTimes1"),
    getItem(<Link to={config.routes.AdminShowTimesCreate}>Thêm giờ chiếu</Link>, "AdminShowTimes2")

  ]),
  getItem("Quản lí Format Film", "AdminFilmFormat", <FcOvertime />, [
    getItem(<Link to={config.routes.AdminFilmFormat}> Xem tất cả</Link>, "AdminFilmFormat1")
  ]),
  getItem("Quản lí phim ", "sub7", <UserOutlined />, [
    getItem(<Link to={config.routes.adminMovie}> Danh sách phim</Link>,"adminMovie1"),
    getItem(<Link to={config.routes.adminMoviecCreat}> Thêm phim</Link>, "adminMovie2"),
  ]),
  getItem("Quản lí Đồ ăn", "adminFood", <UserOutlined />, [
    getItem(<Link to={config.routes.adminFood}> Danh sách Food</Link>, "adminFood1"),
    getItem(<Link to={config.routes.adminFoodCreate}> Thêm Food</Link>, "adminFood2"),
  ]),
  ,
  getItem("Quản lí Slider", "adminSlider", <UserOutlined />, [
    getItem(<Link to={config.routes.adminSlider}> Danh sách Slider</Link>, "adminSlider1"),
    getItem(<Link to={config.routes.adminSliderCreate}> Thêm Slider</Link>,"adminSlider2"),
  ]),

  getItem("Quản lí Voucher", "AdminVouchers", <FcOvertime />, [
    getItem(<Link to={config.routes.AdminVouchers}> Xem tất cả</Link>, "AdminVouchers1"),
    getItem(<Link to={config.routes.AdminVouchersCreate}> Thêm voucher</Link>, "AdminVouchers2")
  ]),

  getItem("Quản lí bài viết", "AdminPosts", <FcOvertime />, [
    getItem(<Link to={config.routes.AdminPosts}> Xem tất cả</Link>, "AdminPosts1"),
    getItem(<Link to={config.routes.AdminPosts}> Thêm bài viết</Link>, "AdminPosts2")
  ]),
  getItem("Quản lí danh muc", "adminCategories", <FcOvertime />, [
    getItem(<Link to={config.routes.adminCategories}> Xem tất cả</Link>, "adminCategories1"),
    getItem(<Link to={config.routes.adminCategoriesCreate}> Thêm danh mục</Link>, "adminCategories2")
  ]),
  getItem(<Link to={config.routes.webConfig}>Thống kê</Link>, "webConfig", <SettingOutlined />, )

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
