import { Flat, Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";
import sortPaginate from "../../utils/sortPaginate";
import { flatSearchableFields } from "./flat.constants";

const createFlatService = async (payload: Flat) => {
  const result = await prisma.flat.create({
    data: payload,
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

  // applying the Filtering.
  if (Object.keys(filterData).length > 0) {
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

const updateFlatService = async (id: string, payload: Partial<Flat>) => {
  const result = await prisma.flat.update({
    where: { id },
    data: payload,
  });

  return result;
};

export const FlatServices = {
  createFlatService,
  getAllFlatsService,
  updateFlatService,
};