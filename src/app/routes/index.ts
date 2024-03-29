import express from "express";
import { UserRoutes } from "../modules/user/user.routes";

const routes = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: UserRoutes,
  },
];

moduleRoutes.map((route) => {
  routes.use(route.path, route.route);
});

export default routes;
