import { flatSortableFields } from "../modules/flat/flat.constants";

export type TPaginationOptions = {
  page?: string;
  limit?: string;
  sortOrder?: string;
  sortBy?: string;
};

export type TPaginationOptionsReturn = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

const sortPaginate = (
  options: TPaginationOptions
): TPaginationOptionsReturn => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const skip: number = (page - 1) * limit;
  const sortBy: string =
    options.sortBy && flatSortableFields.includes(options.sortBy)
      ? options.sortBy
      : "createdAt";
  const sortOrder: string = options.sortOrder || "desc";

  return { page, limit, skip, sortBy, sortOrder };
};

export default sortPaginate;
