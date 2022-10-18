import { UserOutlined, PieChartOutlined, UnorderedListOutlined, PlusOutlined } from "@ant-design/icons";
import { FaCouch } from 'react-icons/fa'
import { FcFilmReel } from 'react-icons/fc'
import { MdHomeMax } from "react-icons/md"
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
    <Link to="/admin">Thống kê</Link>,
    "link",
    <PieChartOutlined />
  ),
  getItem("Quản lí người dùng", "sub2", <UserOutlined />, [
    getItem(<Link to={config.routes.adminUserList}> Danh sách người dùng</Link>, "3", <UnorderedListOutlined />),
    getItem(<Link to={config.routes.adminUserAdd}> Thêm người dùng</Link>, "4", <PlusOutlined />),
  ]),
  getItem("Quản lí thể loại phim", "sub3", <FcFilmReel />, [
    getItem(<Link to={config.routes.adminMovieType}> Danh sách thể loại</Link>, "5", <UnorderedListOutlined />),
    getItem(<Link to={config.routes.adminMovieTypeAdd}> Thêm thể loại</Link>, "6", <PlusOutlined />),
  ]),

  getItem("Quản lí ghế", "sub4", <FaCouch />, [
    getItem(<Link to={config.routes.adminSeatList}> Danh sách ghế</Link>, "9", <UnorderedListOutlined />),
    getItem(<Link to={config.routes.adminSeatCreate}> Thêm ghế</Link>, "10", <PlusOutlined />),
  ]),

  getItem("Quản lí phòng chiếu", "sub5", <MdHomeMax />, [
    getItem(<Link to={config.routes.adminRoom}> Danh sách phòng</Link>, "11", <UnorderedListOutlined />),
    getItem(<Link to={config.routes.adminRoomCreate}> Thêm phòng</Link>, "12", <PlusOutlined />),
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
