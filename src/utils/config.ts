const isProd = process.env.NODE_ENV === "production";
export const clientConfig = {
  app: {
    domain: `${isProd ? "https://" : "http://"}${process.env.APP_DOMAIN}`,
    emailAlias: `support@${process.env.APP_DOMAIN}`,
    address: process.env.APP_ADDRESS as string,
  },
  api: {
    base: process.env.API_BASE as string,
  },
  cloudinary: {
    publicUrl: process.env.CLOUDINARY_PUBLIC_UPLOAD_URL as string,
    uploadPreset: process.env.CLOUDINARY_PUBLIC_UPLOAD_PRESET as string,
  },
} as const;
