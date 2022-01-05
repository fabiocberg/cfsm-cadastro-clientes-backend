import { Bucket, Storage } from "@google-cloud/storage";

import cloudinary from "cloudinary";

export const uploadToStorage = async (file: any, destination: string) => {
  cloudinary.v2.config({
    cloud_name: "dvxyje9l6",
    api_key: "761935334493131",
    api_secret: "TCjZR71U7ef3M58TCPfeyJema1M",
  });

  const response = await cloudinary.v2.uploader.upload(file.path, {
    public_id: destination,
  });
  // console.log(response);

  return response;
};
