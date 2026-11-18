import path from "node:path";
import CopyPlugin from "copy-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          { from: path.join(process.cwd(), "node_modules/cesium/Build/Cesium/Workers"), to: path.join(process.cwd(), "public/cesium/Workers") },
          { from: path.join(process.cwd(), "node_modules/cesium/Build/Cesium/Assets"), to: path.join(process.cwd(), "public/cesium/Assets") },
          { from: path.join(process.cwd(), "node_modules/cesium/Build/Cesium/Widgets"), to: path.join(process.cwd(), "public/cesium/Widgets") },
          { from: path.join(process.cwd(), "node_modules/cesium/Build/Cesium/ThirdParty"), to: path.join(process.cwd(), "public/cesium/ThirdParty") }
        ]
      })
    );
    return config;
  }
};

export default nextConfig;
