/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_EMAIL_ALIAS: process.env.APP_EMAIL_ALIAS,
    CLOUDINARY_PUBLIC_UPLOAD_URL: process.env.CLOUDINARY_PUBLIC_UPLOAD_URL,
    CLOUDINARY_PUBLIC_UPLOAD_PRESET: process.env.CLOUDINARY_PUBLIC_UPLOAD_PRESET,
    CHAT_WIDGET: process.env.CHAT_WIDGET
  }
}

module.exports = nextConfig
