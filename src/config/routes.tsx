const routes = {
  home: "/",
  movie: "/movie",
  signin: "/auth/signin",
  signup: "/auth/signup",
  detail: "/d",
  bookChair: "/book-chair",
  tickitPrice: "/tickit-price",

  // admin
  dashboard: "/admin",
  adminUserList: "/admin/users",
  adminMovieTypeAdd: "/admin/movie-type/create",
  adminMovieType: "/admin/movie-type",
  adminUserAdd: "/admin/users/add",
  adminUserUpdate: "/admin/users/:id",
  adminListTicket: "/admin/ticket",
  adminTicketAdd: "/admin/ticket/add",
  adminTicketUpdate: "/admin/ticket/:id",
  adminTicketPrice: "/admin/ticketprice",
  adminTicketPriceAdd: "/admin/ticketprice/add",
  adminTicketPriceUpdate: "/admin/ticketprice/:id",
  adminSeatType: "/admin/seattype",
  adminSeatTypeAdd: "/admin/seattype/add",
};

export default routes;
