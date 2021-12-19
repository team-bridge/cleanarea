import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from "blitz"
import withAntdLess from "next-plugin-antd-less"

const config: BlitzConfig = (_, { defaultConfigs }) =>
  withAntdLess({
    middleware: [
      sessionMiddleware({
        cookiePrefix: "cleanarea",
        isAuthorized: simpleRolesIsAuthorized,
      }),
    ],
    ...defaultConfigs,

    webpack: (config, _) => {
      return config
    },
    /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
  })

module.exports = config
