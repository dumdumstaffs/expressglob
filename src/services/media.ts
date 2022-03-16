import cloudinary from "@/lib/cloudinary"
import { config } from "@/utils/config"
import { Inject } from "@/utils/di"

@Inject()
export default class MediaService {

    public async upload(id: string) {

    }

    public async destroy(cloudId: string) {
        await cloudinary.uploader.destroy(cloudId)
    }
}
