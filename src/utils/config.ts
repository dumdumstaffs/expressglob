export const clientConfig = {
  app: {
    domain: process.env.APP_DOMAIN,
    emailAlias: `support@${new URL("", process.env.APP_DOMAIN).hostname}`,
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
