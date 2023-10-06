export const clientConfig = {
  app: {
    emailAlias: process.env.APP_EMAIL_ALIAS as string,
    domain: process.env.APP_DOMAIN as string,
    address: process.env.APP_ADDRESS as string,
  },
  api: {
    base: process.env.API_BASE as string,
  },
  cloudinary: {
    publicUrl: process.env.CLOUDINARY_PUBLIC_UPLOAD_URL as string,
    uploadPreset: process.env.CLOUDINARY_PUBLIC_UPLOAD_PRESET as string,
  },
  chatWidget: process.env.CHAT_WIDGET as string,
} as const;
