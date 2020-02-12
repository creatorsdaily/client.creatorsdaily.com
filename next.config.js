const fs = require('fs')
const path = require('path')
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const withLess = require('@zeit/next-less')
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/
})
const lessToJS = require('less-vars-to-js')
const withOffline = require('next-offline')
require('dotenv').config()

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './styles/antd-custom.less'), 'utf8')
)

const {
  API,
  GRAPHQL,
  UPLOAD,
  FILES,
  NAME,
  SLOGAN,
  DESCRIPTION,
  KEYWORDS,
  ONE_SIGNAL_APP_ID,
  GRAPHQL_WS,
  DOMAIN
} = process.env
module.exports = withPlugins([
  withMDX,
  [withOffline, {
    dontAutoRegisterSw: true,
    workboxOpts: {
      swDest: path.join(__dirname, 'public/service-worker.js'),
      runtimeCaching: [{
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200
          },
          networkTimeoutSeconds: 10,
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }]
    }
  }],
  [withLess, {
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables
    }
  }],
  withBundleAnalyzer
], {
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      url: 'native-url'
    }
    config.plugins.push(new CompressionPlugin(), new AntdDayjsWebpackPlugin())
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals)
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader'
      })
    }
    config.plugins.forEach((x) => {
      if (x.constructor.name === 'MiniCssExtractPlugin') {
        x.options.ignoreOrder = true
      }
    })
    // if (!isServer) {
    //   const cacheGroups = config.optimization.splitChunks.cacheGroups
    //   delete cacheGroups.react
    //   cacheGroups.default = false
    //   cacheGroups.commons = {
    //     name: 'commons',
    //     minChunks: 3,
    //     priority: 10
    //   }
    // }
    return config
  },
  poweredByHeader: false,
  pageExtensions: ['js', 'jsx', 'mdx'],
  env: {
    API,
    GRAPHQL,
    UPLOAD,
    FILES,
    NAME,
    SLOGAN,
    DESCRIPTION,
    KEYWORDS,
    ONE_SIGNAL_APP_ID,
    DOMAIN,
    GRAPHQL_WS,
    VERSION: require('./package.json').version
  }
})
