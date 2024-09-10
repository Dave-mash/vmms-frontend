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
  NEXT_PUBLIC_API_BASE_URL: "https://fms-backend-staging.staging.kiotapay.co.ke/api/v1/",
  NEXTAUTH_URL: "https://fms-backend-staging.staging.kiotapay.co.ke/api/",
  NEXTAUTH_SECRET: "process.env.NEXTAUTH_SECRET",
  NEXT_PUBLIC_TEST_ENV: "process.env.NEXT_PUBLIC_TEST_ENV"
}

module.exports = {
  ...nextConfig,
  env
}