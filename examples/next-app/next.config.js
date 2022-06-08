const { svgConfig } = require('../../webpack-helpers');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer, buildId, webpack }) => {
    svgConfig(config, { isServer });
    
    return config;
  },
}

module.exports = nextConfig

