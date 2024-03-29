import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { FlatRoutes } from "../modules/flat/flat.routes";

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
];

moduleRoutes.map((route) => {
  routes.use(route.path, route.route);
});

export default routes;
