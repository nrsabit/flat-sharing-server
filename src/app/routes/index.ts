import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { FlatRoutes } from "../modules/flat/flat.routes";
import { BookingRoutes } from "../modules/booking/booking.routes";
import { ProfileRoutes } from "../modules/profile/profile.routers";

const routes = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: UserRoutes,
  },
  {
    path: "/flats",
    route: FlatRoutes,
  },
  {
    path: "/",
    route: BookingRoutes,
  },
  {
    path: "/profile",
    route: ProfileRoutes,
  },
];

moduleRoutes.map((route) => {
  routes.use(route.path, route.route);
});

export default routes;
