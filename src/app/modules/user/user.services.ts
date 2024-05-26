import bcrypt from "bcrypt";
import { config } from "../../config";
import prisma from "../../shared/prisma";
import { TUserLoginPayload, TUserPayload } from "./user.types";
import { generateToken } from "../../utils/jwtFunctions";

const registerService = async (payload: TUserPayload) => {
  const { userName, email, password } = payload;

  // hasing the password
  const hashedPassword = await bcrypt.hash(password, config.salt);

  // defining data to create the user.
  const userData = {
    userName,
    email,
    password: hashedPassword,
  };

  const result = await prisma.user.create({
    data: userData,
  });

  return result;
};

const loginService = async (payload: TUserLoginPayload) => {
  // checking the user is exist or not.
  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email },
  });

  // validating the password
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isPasswordMatched) {
    throw new Error("Password didn't match");
  }

  const userPayload = {
    id: userData.id,
    userName: userData.userName,
    email: userData.email,
  };

  // generating the token
  const token = generateToken(
    userPayload,
    config.jwt_access_secret,
    config.jwt_access_expiresin
  );

  return { ...userPayload, token };
};

const changePasswordService = async (
  user: TUserPayload,
  payload: Record<string, any>
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }

  const hashedPassword: string = await bcrypt.hash(
    payload.newPassword,
    config.salt
  );

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    message: "Password changed successfully!",
  };
};

export const UserServices = {
  registerService,
  loginService,
  changePasswordService,
};
