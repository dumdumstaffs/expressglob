/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  env: {
    APP_EMAIL_ALIAS: process.env.APP_EMAIL_ALIAS,
    APP_DOMAIN: process.env.APP_DOMAIN,
    APP_ADDRESS: process.env.APP_ADDRESS,
    API_BASE: process.env.API_BASE,
    CLOUDINARY_PUBLIC_UPLOAD_URL: process.env.CLOUDINARY_PUBLIC_UPLOAD_URL,
    CLOUDINARY_PUBLIC_UPLOAD_PRESET:
      process.env.CLOUDINARY_PUBLIC_UPLOAD_PRESET,
    CHAT_WIDGET: process.env.CHAT_WIDGET,
  },
};

module.exports = nextConfig;
