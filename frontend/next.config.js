/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.export = nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "upcdn.io",
      },
    ],
  },
};
