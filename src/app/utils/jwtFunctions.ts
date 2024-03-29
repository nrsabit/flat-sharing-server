import jwt, { Secret } from "jsonwebtoken";
import { config } from "../config";

export const generateToken = (
  payload: { id: string; email: string },
  secret: Secret,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, config.jwt_access_secret);
  return decoded;
};
