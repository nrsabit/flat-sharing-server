import { JwtPayload } from "jsonwebtoken";
import prisma from "../shared/prisma";
import { verifyToken } from "../utils/jwtFunctions";
import { NextFunction, Request, Response } from "express";

const auth = () => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("Unauthorized Access");
      }

      const decodedUser = verifyToken(token) as JwtPayload;

      await prisma.user.findUniqueOrThrow({
        where: { id: decodedUser.id },
      });

      req.user = decodedUser;

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
