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
  NEXTAUTH_SECRET: "secret!JWTrandom65"
}

module.exports = {
  ...nextConfig,
  env
}