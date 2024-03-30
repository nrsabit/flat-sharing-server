import { User, UserProfile } from "@prisma/client";
import prisma from "../../shared/prisma";

const getUserProfileService = async (user: Partial<User>) => {
  const result = await prisma.userProfile.findUniqueOrThrow({
    where: { userId: user.id },
  });

  return result;
};

const updateUserProfileService = async (user: User, payload: UserProfile) => {
  const result = await prisma.userProfile.update({
    where: { userId: user.id },
    data: payload,
  });

  return result;
};

export const ProfileServices = {
  getUserProfileService,
  updateUserProfileService,
};
