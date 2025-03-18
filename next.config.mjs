import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    Api: process.env.Api,
    Images: process.env.Images,
    Address: process.env.Address,
    Map: process.env.Map,
    Phone: process.env.Phone,
  },
};

export default withNextIntl(nextConfig);
