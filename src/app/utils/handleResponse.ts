import { Response } from "express";
type TMeta = {
  total: number;
  page: number;
  limit: number;
};

type TJsonObject = {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: TMeta;
  data: any;
};

const handleResponse = (res: Response, jsonObject: TJsonObject) => {
  res.send({
    success: jsonObject.success,
    statusCode: jsonObject.statusCode,
    message: jsonObject.message,
    meta: jsonObject.meta || null || undefined,
    data: jsonObject.data || null || undefined,
  });
};

export default handleResponse;
