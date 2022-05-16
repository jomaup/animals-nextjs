/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://https://animals-nest-js.herokuapp.com/:path",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://animals-nestjs.herokuapp.com/",
          },
        ],
      },
    ];
    c;
  },
};

module.exports = nextConfig;
