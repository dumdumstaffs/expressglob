/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLOUDINARY_PUBLIC_UPLOAD_URL: process.env.CLOUDINARY_PUBLIC_UPLOAD_URL,
    CLOUDINARY_PUBLIC_UPLOAD_PRESET: process.env.CLOUDINARY_PUBLIC_UPLOAD_PRESET
  }
}

module.exports = nextConfig
