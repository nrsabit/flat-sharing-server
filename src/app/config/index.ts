import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  port: process.env.PORT,
  salt: Number(process.env.PASSWORD_SALT_ROUNDS),
  jwt_access_secret: process.env.JWT_ACCESS_SECRET as Secret,
  jwt_access_expiresin: process.env.JWT_TOKEN_EXPIRES_IN as string,
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};
