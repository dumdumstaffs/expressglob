import { serverConfig } from "@api/utils/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: serverConfig.cloudinary.CLOUD_NAME,
  api_key: serverConfig.cloudinary.CLOUD_API_KEY,
  api_secret: serverConfig.cloudinary.CLOUD_SECRET,
});

export default cloudinary;
