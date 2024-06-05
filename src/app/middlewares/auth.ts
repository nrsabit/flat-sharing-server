import { JwtPayload } from "jsonwebtoken";
import prisma from "../shared/prisma";
import { verifyToken } from "../utils/jwtFunctions";
import { NextFunction, Request, Response } from "express";

const auth = (roles?: string[]) => {
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

      if (!decodedUser) {
        throw new Error("Unauthorized Access");
      }

      if (roles?.length && !roles.includes(decodedUser?.role)) {
        throw new Error("Unauthorized Access");
      }

      await prisma.user.findUniqueOrThrow({
        where: { id: decodedUser.id, isActive: true },
      });

      req.user = decodedUser;

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
