import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { FlatRoutes } from "../modules/flat/flat.routes";
import { BookingRoutes } from "../modules/booking/booking.routes";

const routes = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/flats",
    route: FlatRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  }
];

moduleRoutes.map((route) => {
  routes.use(route.path, route.route);
});

export default routes;
