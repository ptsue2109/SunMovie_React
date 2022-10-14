import { UserOutlined, PieChartOutlined } from "@ant-design/icons";
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
  getItem(
    <Link to="/admin/dashboard">Thống kê</Link>,
    "link",
    <PieChartOutlined />
  ),
  getItem("Quản lí người dùng", "sub2", <UserOutlined />, [
    getItem(
      <Link to={config.routes.adminUserList}> Danh sách người dùng</Link>,
      "3"
    ),
    getItem(<Link to={config.routes.adminUserAdd}> Thêm người dùng</Link>, "4"),
  ]),
  getItem("Quản lí thể loại phim", "sub3", <UserOutlined />, [
    getItem(
      <Link to={config.routes.adminMovieType}> Danh sách thể loại</Link>,
      "5"
    ),
    getItem(
      <Link to={config.routes.adminMovieTypeAdd}> Thêm thể loại</Link>,
      "6"
    ),
  ]),
  getItem("Quản lí Vé Xem phim", "sub4", <UserOutlined />, [
    getItem(
      <Link to={config.routes.adminListTicket}> Danh sách Vé Xem phim</Link>,
      "7"
    ),
    getItem(<Link to={config.routes.adminTicketAdd}> Thêm Vé</Link>, "8"),
  ]),
  getItem("Quản lí Vé  ", "sub5", <UserOutlined />, [
    getItem(
      <Link to={config.routes.adminTicketPrice}> Danh sách Vé Xem phim</Link>,
      "9"
    ),
    getItem(<Link to={config.routes.adminTicketPriceAdd}> Thêm Vé</Link>, "10"),
  ]),
  getItem("Quản lí Loại Ghế  ", "sub6", <UserOutlined />, [
    getItem(
      <Link to={config.routes.adminSeatType}> Danh sách loại ghế</Link>,
      "11"
    ),
    getItem(<Link to={config.routes.adminSeatTypeAdd}> Thêm ghế</Link>, "12"),
  ]),
  getItem("Quản lí Loại Vé  ", "sub7", <UserOutlined />, [
    getItem(
      <Link to={config.routes.adminTicketDetail}> Danh sách Loại Vé</Link>,
      "13"
    ),
    getItem(
      <Link to={config.routes.adminTicketDetailAdd}> Thêm Loại Vé</Link>,
      "14"
    ),
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
