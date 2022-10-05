import { Fragment, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { publicRoutes } from "./routes";
import { ClientTheme } from "./themes";
import 'antd/dist/antd.css';
import ScrollToTop from "./ultils/ScrollToTop";
import "bootstrap/dist/css/bootstrap.min.css"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout: any = ClientTheme ;

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
        <ScrollToTop/>
      </BrowserRouter>
    </>
  );
}

export default App;
