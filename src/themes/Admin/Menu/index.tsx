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
  getItem(<Link to="/admin">Thống kê</Link>, "link", <PieChartOutlined />),
  getItem("Quản lí người dùng", "adminUser", <UserOutlined />, [
    getItem(<Link to={config.routes.adminUserList}> Danh sách người dùng</Link>,"adminUser1"),
    getItem(<Link to={config.routes.adminUserAdd}> Thêm người dùng</Link>, "adminUser2"),
  ]),
  getItem("Quản lí thể loại phim", "adminMovieType", <UserOutlined />, [
    getItem(<Link to={config.routes.adminMovieType}> Danh sách thể loại</Link>,"adminMovieType5"),
    getItem( <Link to={config.routes.adminMovieTypeAdd}> Thêm thể loại</Link>, "adminMovieType6"),
  ]),
  getItem("Quản lí Vé Xem phim", "adminListTicket", <UserOutlined />, [
    getItem(<Link to={config.routes.adminListTicket}> Danh sách Vé Xem phim</Link>,"adminListTicket7"),
    getItem(<Link to={config.routes.adminTicketAdd}> Thêm Vé</Link>, "adminListTicket8"),
  ]),
  getItem("Quản lí Vé", "adminTicketPrice", <UserOutlined />, [
    getItem(<Link to={config.routes.adminTicketPrice}> Danh sách Vé Xem phim</Link>,"adminTicketPrice9"),
    getItem(<Link to={config.routes.adminTicketPriceAdd}> Thêm Vé</Link>, "adminTicketPrice10"),
  ]),
  getItem("Quản lí Loại Ghế", "adminSeatType", <UserOutlined />, [
    getItem(<Link to={config.routes.adminSeatType}> Danh sách loại ghế</Link>,"adminSeatType1"),
    getItem(<Link to={config.routes.adminSeatTypeAdd}> Thêm ghế</Link>, "adminSeatType2"),
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
