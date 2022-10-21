const routes = {
  home: "/",
  movie: "/movie",
  news:"/news",
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
  adminSeatTypeUpdate: "/admin/seattype/:id",
  adminMovieTypeEdit: "/admin/movie-type/:id",
  adminCategories: "/admin/categories",
  adminCategoriesCreate: "/admin/categories/create",
  adminMoviecCreat: "/admin/movies/create",
  adminMovie: "/admin/movies",
  adminMoviecUpdate: "/admin/movies/:id",

  adminRooms: "/admin/rooms",
  adminRoomsCreate: "/admin/rooms/create",
  adminRoomEdit: "/admin/rooms/:id",

  AdminShowTimes: "/admin/showTimes",
  AdminShowTimesCreate: "/admin/showTimes/create",
  AdminShowTimesEdit: "/admin/showTimes/:id",

  AdminFilmFormat: "/admin/filmFormats",
};

export default routes;
