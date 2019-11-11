const fs = require('fs')
const path = require('path')
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
// const withCSS = require('@zeit/next-css')
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
  DOMAIN
} = process.env
module.exports = withPlugins([
  withMDX,
  // [withCSS, {
  //   cssModules: false,
  //   cssLoaderOptions: {
  //     url: false
  //   }
  // }],
  [withOffline, {
    // generateInDevMode: true,
    dontAutoRegisterSw: true,
    workboxOpts: {
      swDest: path.join(__dirname, 'public/service-worker.js')
    }
  }],
  [withLess, {
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables // make your antd custom effective
    }
  }],
  [withBundleAnalyzer, {
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../../bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
      }
    }
  }]
], {
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@ant-design/icons/lib/dist$': path.resolve(__dirname, './libs/icons.js'),
      moment: 'dayjs'
    }
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
    VERSION: require('./package.json').version
  }
})
