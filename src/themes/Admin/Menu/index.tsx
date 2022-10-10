import { Link } from "react-router-dom";
import { Menu } from "antd";
import config from "../../../config";
const { SubMenu } = Menu;

type Props = {};

const MenuAdminLayout = (props: Props) => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1">
        <Link to="/admin">Dashboard</Link>
      </Menu.Item>

      <SubMenu key="sub1" title="User">
        <Menu.Item key="2">
          <Link to={config.routes.adminUserList}>List User</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={config.routes.adminUserList}>Add User</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" title="Movie Type">
        <Menu.Item key="2">
          <Link to={`config.routes.adminUserList`}>List Movie Type</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={config.routes.adminMovieTypeAdd}>Add Movie Type</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default MenuAdminLayout;
