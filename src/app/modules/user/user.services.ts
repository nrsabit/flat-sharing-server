import bcrypt from "bcrypt";
import { config } from "../../config";
import prisma from "../../shared/prisma";
import { TUserLoginPayload, TUserPayload } from "./user.types";
import { generateToken } from "../../utils/jwtFunctions";

const registerService = async (payload: TUserPayload) => {
  const { name, email, password, ...profileData } = payload;

  // hasing the password
  const hashedPassword = await bcrypt.hash(password, config.salt);

  // defining data to create the user.
  const userData = {
    name,
    email,
    password: hashedPassword,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    // creating the user
    const createdUser = await transactionClient.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // creating the user profile
    await transactionClient.userProfile.create({
      data: { ...profileData, userId: createdUser.id },
    });

    return createdUser;
  });

  return result;
};

const loginService = async (payload: TUserLoginPayload) => {

  // checking the user is exist or not. 
  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email },
  });

  // validating the password
  const isPasswordMatched = await bcrypt.compare(payload.password, userData.password);

  if (!isPasswordMatched) {
    throw new Error("Password didn't match");
  }

  const userPayload = {
    id: userData.id,
    name: userData.name,
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

export const UserServices = {
  registerService,
  loginService,
};
