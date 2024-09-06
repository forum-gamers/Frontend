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
  env: {
    GOOGLE_OAUTH_CLIENTID: process.env.GOOGLE_OAUTH_CLIENTID,
    GOOGLE_OAUTH_CLIENTSECRET: process.env.GOOGLE_OAUTH_CLIENTSECRET,
  },
};

export default nextConfig;
