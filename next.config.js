/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  source: "/:path*",
  destination: "/another/:path*",
};

module.exports = nextConfig;
