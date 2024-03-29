import { UserControllers } from "./user.controllers";
import express from "express";

const router = express.Router();

router.post("/register", UserControllers.registerController);

export const UserRoutes = router