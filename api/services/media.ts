import cloudinary from "@api/lib/cloudinary";

export class MediaService {
  public async destroy(cloudId: string) {
    await cloudinary.uploader.destroy(cloudId);
  }
}
