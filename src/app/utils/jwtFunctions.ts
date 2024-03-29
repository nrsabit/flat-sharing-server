import jwt, { Secret } from "jsonwebtoken";

export const generateToken = (
  payload: { id: string; email: string },
  secret: Secret,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};
