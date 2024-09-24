/** @type {import('next').NextConfig} */

// const runtimeCaching = require("@ducanh2912/next-pwa/cache")

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require("@ducanh2912/next-pwa").default({
  // disable: process.env.NODE_ENV === "development",
  dest: "public",
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest.json$/],
  // runtimeCaching,
})

const nextConfig = withPWA({
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  }

  // experimental: {
  //   outputFileTracingRoot: path.join(__dirname, "./"),
  // },
})

const env = process.env.NODE_ENV === "development" ? {} : {
  NEXTAUTH_URL: "http://102.209.68.72:32391",
  NEXTAUTH_SECRET: "secret!JWTrandom65",
  // GITHUB_REGISTRY: "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",
  NEXT_PUBLIC_GITHUB_CLIENT_ID: "Ov23li1JRtxLjAH3IO8D",
  NEXT_PUBLIC_GITHUB_CLIENT_SECRET: "e3820c1c46a1ade605e5aa1b7881dd0babefe811",
  NEXT_PUBLIC_VMMS_BACKEND_URL: "http://localhost:3000",
  NEXT_PUBLIC_GITHUB_OAUTH_ID: "Ov23li1JRtxLjAH3IO8D",
  AUTH_SECRET: "63APnhoxtwPZCoVzhxq4ROLzw8TEBINMur/2AS1Ymco=",
  // GITHUB_SECRET: "e3820c1c46a1ade605e5aa1b7881dd0babefe811",
  // GITHUB_ID: "Ov23li1JRtxLjAH3IO8D"
}

module.exports = {
  ...nextConfig,
  env
}