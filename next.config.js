/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add a rule to handle the node:buffer scheme
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:buffer/, (resource) => {
        resource.request = "buffer";
      }),
      new webpack.NormalModuleReplacementPlugin(/^node:stream/, (resource) => {
        resource.request = "stream-browserify";
      })
    );

    return config;
  },
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Server",
            value: "Apache", // phony server value
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "sameorigin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "same-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=*", // allow specified policies here
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
