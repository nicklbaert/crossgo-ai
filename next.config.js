/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "f004.backblazeb2.com",
      "localhost:3000",
      "firebasestorage.googleapis.com",
      "upload.wikimedia.org",
      "img.olympicchannel.com",
    ],
  },
}

module.exports = nextConfig
