/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  source: "/:path*",
  destination: "/another/:path*",
  transformIgnorePatterns: [
    "node_modules/(?!(@ionic/react|@ionic/react-router|@ionic/core|@stencil/core|ionicons)/)",
  ],
};

module.exports = nextConfig;
