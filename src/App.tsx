import { Fragment, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import { ClientTheme, AdminTheme } from "./themes";
import "antd/dist/antd.css";
import ScrollToTop from "./ultils/ScrollToTop";
import { useAppDispatch } from "./redux/hook";
import { getUsers } from "./redux/slice/userSlice";
import { getProvider } from "./redux/slice/Provider";
import { getMovieType } from "./redux/slice/movieTypeSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getProvider());
    dispatch(getMovieType());
  }, []);

  return (
    <>
      {/* <BrowserRouter> */}
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout: any = ClientTheme;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}

        {privateRoutes.map((route, index) => {
          const Page = route.component;
          let Layout: any = AdminTheme;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
      <ScrollToTop />
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
