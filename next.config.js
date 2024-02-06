/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["orzu-next-ecommerce.s3.amazonaws.com"],
    },
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
};

module.exports = nextConfig;
