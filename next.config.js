const fs = require('fs')
const path = require('path')
const URL = require('url').URL
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
  PRODUCT_ID,
  GRAPHQL_WS,
  CLOSE_TIP,
  BAIDU_TONGJI,
  PARSER,
  DOMAIN
} = process.env
module.exports = withPlugins([
  withMDX,
  [withOffline, {
    dontAutoRegisterSw: true,
    workboxOpts: {
      swDest: path.join(__dirname, 'public/service-worker.js'),
      runtimeCaching: [{
        urlPattern: /^https:\/\/matomo\.tengfei\.fun\/matomo\.php.*/i,
        handler: 'NetworkOnly'
      }, {
        urlPattern: /^https:\/\/www\.gravatar\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gravatar',
          expiration: {
            maxEntries: 512,
            maxAgeSeconds: 24 * 60 * 60 * 3
          }
        }
      }, {
        urlPattern: /^https:\/\/cdn\.onesignal\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'one-signal',
          expiration: {
            maxEntries: 8,
            maxAgeSeconds: 24 * 60 * 60 * 3
          }
        }
      }, {
        urlPattern: /^https:\/\/media\.creatorsdaily\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'media-creatorsdaily-com',
          expiration: {
            maxEntries: 1024,
            maxAgeSeconds: 24 * 60 * 60 * 365
          }
        }
      }, {
        urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)(\?.*)?$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'static-image-assets',
          expiration: {
            maxEntries: 1024,
            maxAgeSeconds: 24 * 60 * 60 * 30
          }
        }
      }, {
        urlPattern: /\.(?:js)(\?.*)?$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'static-js-assets',
          expiration: {
            maxEntries: 512,
            maxAgeSeconds: 24 * 60 * 60 * 3
          }
        }
      }, {
        urlPattern: /\.(?:css)(\?.*)?$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'static-style-assets',
          expiration: {
            maxEntries: 128,
            maxAgeSeconds: 24 * 60 * 60 * 3
          }
        }
      }, {
        urlPattern: /^https?.*/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'others',
          expiration: {
            maxEntries: 512
          },
          // networkTimeoutSeconds: 3,
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
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader'
    })
    return config
  },
  poweredByHeader: false,
  pageExtensions: ['js', 'jsx', 'mdx'],
  images: {
    domains: [new URL(FILES).host]
  },
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
    PRODUCT_ID,
    DOMAIN,
    GRAPHQL_WS,
    CLOSE_TIP,
    BAIDU_TONGJI,
    PARSER,
    VERSION: require('./package.json').version
  },
  async redirects () {
    return [
      {
        source: '/talk',
        destination: '/discussions',
        permanent: true
      }
    ]
  }
})
