// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   // fallback: {
//   //   "fs": false,
//   //   "path": false,
//   //   "os": false,
//   // }
// }

//module.exports = nextConfig

module.exports = (phase, { defaultConfig }) => {
  return {
    ...defaultConfig,

    webpack: (config) => {
      config.resolve = {
        ...config.resolve,
        fallback: {
          "fs": false,
          "path": false,
          "os": false,
        }
      }
      return config
    },
  }
}
