import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuAdminLayout from "./Menu";
import {
  Divider,
  Layout,
  Breadcrumb,
  Col,
  Row,
  Typography,
  Dropdown,
  Menu,
  message,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import configRoute from "../../config";
import { LogOut } from "../../redux/slice/AuthSlice";

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

type AdminLayoutProps = {
  children: JSX.Element;
  title: string;
};

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const { currentUser, isLogged } = useAppSelector(
    (state) => state.authReducer
  );
  const [iscollapse, setIsCollapse] = useState<boolean>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSignout = () => {
    message.success({ content: "Đã đăng xuất" });
    dispatch(LogOut());
    navigate(configRoute.routes.signin);
  };
  useEffect(() => {
    if (isLogged == true) {
      if (currentUser.role == 0) {
        navigate(configRoute.routes.home);
      }
    } else {
      navigate(configRoute.routes.home);
    }
  }, []);
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <Text>Profile</Text>,
        },
        {
          key: "2",
          label: <Text onClick={handleSignout}>Logout</Text>,
        },
      ]}
    />
  );

  return (
    <Layout
      style={{
        minHeight: "120vh",
      }}
    >
      <Sider
        breakpoint="md"
        collapsedWidth={50}
        onCollapse={(collapse) => setIsCollapse(collapse)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          overflow: "auto",
        }}
      >
        <div
          style={{
            padding: "0 16px",
            height: 46,
            lineHeight: "50px",
            fontSize: 20,
            fontWeight: 700,
            textTransform: "uppercase",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Link to="/" style={{ color: "#fff" }}>
            {iscollapse ? "S" : "SunCinema"}
          </Link>
        </div>
        <Divider style={{ margin: 0 }} />

        <MenuAdminLayout />
      </Sider>

      <Layout
        style={{
          marginLeft: iscollapse ? 50 : 200,
        }}
      >
        <Header
          style={{
            height: 50,
            backgroundColor: "#fff",
            padding: "0 15px",
            lineHeight: "50px",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            fontSize: "14px",
          }}
        >
          <div className="flex justify-between">
            <h1>Header</h1>
            <Dropdown overlay={menu} placement="bottomRight">
              <div className="flex items-center cursor-pointer">
                <UserOutlined
                  style={{ fontSize: 16, marginRight: 8 }}
                  title="User"
                />
                <span>{currentUser.username}</span>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content
          style={{
            padding: 15,
          }}
        >
          <Row justify="space-between">
            <Col>
              <Title level={4}>{title}</Title>
            </Col>
            <Col>
              <Breadcrumb>
                <Breadcrumb.Item>Admin</Breadcrumb.Item>
                <Breadcrumb.Item>{title}</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>

          <main
            style={
              title !== "Dashboard"
                ? {
                    backgroundColor: "#fff",
                    padding: 10,
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                    borderRadius: 4,
                  }
                : {
                    padding: 10,
                  }
            }
          >
            {children}
          </main>
        </Content>

        <Footer
          style={{
            textAlign: "center",
            padding: "15px 15px",
            backgroundColor: "#fff",
          }}
        >
          Footer
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
