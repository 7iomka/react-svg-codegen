const { svgConfig } = require('../../webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    svgConfig(config, { isServer });

    return config;
  },
}

module.exports = nextConfig

