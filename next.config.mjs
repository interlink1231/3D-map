import path from "node:path";
import CopyPlugin from "copy-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          { from: path.join(process.cwd(), "node_modules/cesium/Build/Cesium/Workers"), to: "static/cesium/Workers" },
          { from: path.join(process.cwd(), "node_modules/cesium/Build/Cesium/Assets"), to: "static/cesium/Assets" },
          { from: path.join(process.cwd(), "node_modules/cesium/Build/Cesium/Widgets"), to: "static/cesium/Widgets" },
          { from: path.join(process.cwd(), "node_modules/cesium/Build/Cesium/ThirdParty"), to: "static/cesium/ThirdParty" }
        ]
      })
    );
    return config;
  }
};

export default nextConfig;
