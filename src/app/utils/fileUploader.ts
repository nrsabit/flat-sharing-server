import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const storage = multer.memoryStorage();

const upload = multer({ storage });

const uploadToCloudinary = async (file: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      (error: Error, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url);
        }
      }
    );
    stream.end(file);
  });
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
