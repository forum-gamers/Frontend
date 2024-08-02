/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ["js", "jsx", "mdx", "md", "ts", "tsx"],
  compiler: {
    reactRemoveProperties: { properties: ["renderNode"] },
  },
};

export default nextConfig;
