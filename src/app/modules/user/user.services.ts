import bcrypt from "bcrypt";
import { config } from "../../config";
import prisma from "../../shared/prisma";
import { TUserPayload } from "./user.types";

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

export const UserServices = {
  registerService,
};
