const routes = {
  home: "/",
  movie: "/movie",
  news: "/news",
  signin: "/auth/signin",
  signup: "/auth/signup",
  detail: "/:slug",
  bookChair: "/book-chair",
  tickitPrice: "/tickit-price",
  newsCate1: "/categories",
  newsCate2: "/categories/:slug",
  newsDetail: "/post/:slug",
  search: "/search",

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
  AdminShowTimeSeat: "/admin/showTimes/seat/:id",
  
  AdminFilmFormat: "/admin/filmFormats",

  AdminVouchers: "/admin/vouchers",
  AdminVouchersCreate: "/admin/vouchers/add",
  AdminVouchersEdit: "/admin/vouchers/:id",

  AdminPosts: "/admin/posts",
  AdminPostsCreate: "/admin/posts/add",
  AdminPostsEdit: "/admin/posts/:id",
  renderSeatAdmin: "/admin/seats/_v=:id"
};

export default routes;
