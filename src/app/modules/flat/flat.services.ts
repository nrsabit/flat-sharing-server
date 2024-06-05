import { Flat, Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";
import sortPaginate from "../../utils/sortPaginate";
import { flatSearchableFields } from "./flat.constants";
import { Request } from "express";
import { fileUploader } from "../../utils/fileUploader";
import { TUserPayload } from "../user/user.types";

const createFlatService = async (user: TUserPayload, req: Request) => {
  const images = req?.files as Express.Multer.File[];
  const data = req.body;
  data.userId = user?.id;

  let uploadedImages = [""];
  if (images) {
    uploadedImages = await Promise.all(
      images.map((file: any) => fileUploader.uploadToCloudinary(file.buffer))
    );
  }

  data.images = uploadedImages;

  const result = await prisma.flat.create({
    data,
  });

  return result;
};

const getAllFlatsService = async (
  queryObj: Record<string, unknown>,
  options: Record<string, unknown>
) => {
  const { searchTerm, ...filterData } = queryObj;
  const { page, limit, skip, sortBy, sortOrder } = sortPaginate(options);

  // the main condition object.
  const andCondition: Prisma.FlatWhereInput[] = [];

  // applying the searchTerm.
  if (searchTerm) {
    andCondition.push({
      OR: flatSearchableFields.map((field) => ({
        [field]: { contains: searchTerm, mode: "insensitive" },
      })),
    });
  }

  // filter with max or min rent price
  if (filterData.minPrice || filterData.maxPrice) {
    const rentCondition: any = {};
    if (filterData.minPrice) {
      rentCondition.gte = Number(filterData.minPrice);
    }
    if (filterData.maxPrice) {
      rentCondition.lte = Number(filterData.maxPrice);
    }
    andCondition.push({ rent: rentCondition });
  }

  // Remove minPrice and maxPrice from filterData
  const { minPrice, maxPrice, ...restFilterData } = filterData;

  // applying the Filtering.
  if (Object.keys(restFilterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: { equals: filterData[key] === "true" ? true : false },
      })),
    });
  }

  const whereClause: Prisma.FlatWhereInput = { AND: andCondition };

  const result = await prisma.flat.findMany({
    where: whereClause,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  // count of the query.
  const total = await prisma.flat.count({ where: whereClause });

  const meta = { total, page, limit };

  return { meta, result };
};

const getSingleFlatService = async (id: string) => {
  const result = await prisma.flat.findUniqueOrThrow({
    where: { id },
  });

  return result;
};

const getMyFlatsService = async (user: TUserPayload) => {
  const result = await prisma.flat.findMany({
    where: { userId: user?.id },
  });

  return result;
};

const updateFlatService = async (id: string, payload: Partial<Flat>) => {
  const result = await prisma.flat.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteFlatService = async (user: TUserPayload, id: string) => {
  const flatInfo = await prisma.flat.findUniqueOrThrow({ where: { id } });

  if (user?.role !== "admin" || flatInfo.userId !== user?.id) {
    throw new Error("Unauthorized");
  }

  const result = await prisma.$transaction(async (tx) => {
    await tx.booking.deleteMany({ where: { flatId: id } });
    const deletedData = await tx.flat.delete({ where: { id } });
    return deletedData;
  });
  return result;
};

export const FlatServices = {
  createFlatService,
  getAllFlatsService,
  getSingleFlatService,
  getMyFlatsService,
  updateFlatService,
  deleteFlatService,
};
