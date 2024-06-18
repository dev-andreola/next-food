/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "utfs.io" }, { hostname: "miro.medium.com" }],
  },
};

export default nextConfig;
