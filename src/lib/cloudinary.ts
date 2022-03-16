import { v2 as cloudinary } from "cloudinary"
import { config } from "@/utils/config"

cloudinary.config({
    cloud_name: config.cloudinary.CLOUD_NAME,
    api_key: config.cloudinary.CLOUD_API_KEY,
    api_secret: config.cloudinary.CLOUD_SECRET,
})

export default cloudinary