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
  adminMovieTypeEdit: "/admin/movie-type/:id",
  adminSeatList: "/admin/seats",
  adminSeatCreate: "/admin/seats/create",
  adminSeatEdit: "/admin/seats/edit/:id",

  adminRoom: "/admin/rooms",
  adminRoomCreate: "/admin/rooms/create",
  adminRoomEdit: "/admin/rooms/:id"
};

export default routes;
