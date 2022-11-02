import { Fragment, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import { ClientTheme, AdminTheme } from "./themes";
import "antd/dist/antd.css";
import ScrollToTop from "./ultils/ScrollToTop";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { getMovieType } from "./redux/slice/movieTypeSlice";
import { getTicket } from "./redux/slice/ticketSlice";
import { getTicketPrice } from "./redux/slice/ticketPriceSlice";
import { getSeatType } from "./redux/slice/SeatTypeSlice";
import { getCategories } from "./redux/slice/CategorySlice";
import { getMovie } from "./redux/slice/Movie";
import { getUsers } from "./redux/slice/userSlice";
import {getAllData} from "./redux/slice/FilmFormatSlice"
import {getRooms} from "./redux/slice/roomSlice"
function App() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.authReducer);
  useEffect(() => {
    dispatch(getMovieType());
    dispatch(getTicket());
    dispatch(getTicketPrice());
    dispatch(getSeatType());
    dispatch(getCategories());
    dispatch(getMovie());
    dispatch(getUsers());
    dispatch(getAllData());
    dispatch(getRooms())

  }, [dispatch]);

  return (
    <>
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
    </>
  );
}

export default App;
