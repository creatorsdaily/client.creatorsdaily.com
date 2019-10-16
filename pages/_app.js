import App from 'next/app'
import Head from 'next/head'
import { ConfigProvider, Empty } from 'antd'
import { ApolloProvider } from '@apollo/react-common'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import { Router, makePublicRouterInstance } from 'next/router'
import withApollo from '../libs/with-apollo'
import Matomo from '../components/Matomo'
import Error from './_error'
import '../libs/day'
import '../styles/index.less'

const renderEmpty = () => (
  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
)

class Creators extends App {
  componentDidMount () {
    Router.events.on('routeChangeStart', url => {
      if (window && window._paq) {
        window._paq.push(['setCustomUrl', url])
        window._paq.push(['setDocumentTitle', document.title])
        window._paq.push(['trackPageView'])
      }
    })
  }

  render () {
    const { pageProps, router, apolloClient } = this.props
    let Component = this.props.Component

    if (pageProps.statusCode) {
      Component = Error
    }

    return (
      <ConfigProvider locale={zhCN} renderEmpty={renderEmpty}>
        <Head>
          <title>{process.env.NAME} | {process.env.SLOGAN}</title>
          <meta key='description' name='description' content={process.env.DESCRIPTION} />
          <meta key='keywords' name='keywords' content={process.env.KEYWORDS} />
          <link rel='apple-touch-icon' sizes='57x57' href='/apple-icon-57x57.png' />
          <link rel='apple-touch-icon' sizes='60x60' href='/apple-icon-60x60.png' />
          <link rel='apple-touch-icon' sizes='72x72' href='/apple-icon-72x72.png' />
          <link rel='apple-touch-icon' sizes='76x76' href='/apple-icon-76x76.png' />
          <link rel='apple-touch-icon' sizes='114x114' href='/apple-icon-114x114.png' />
          <link rel='apple-touch-icon' sizes='120x120' href='/apple-icon-120x120.png' />
          <link rel='apple-touch-icon' sizes='144x144' href='/apple-icon-144x144.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='/apple-icon-152x152.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='/apple-icon-180x180.png' />
          <link rel='icon' type='image/png' sizes='192x192' href='/android-icon-192x192.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='96x96' href='/favicon-96x96.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='manifest' href='/manifest.json' />
          <meta name='msapplication-TileColor' content='#ffffff' />
          <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
          <meta name='theme-color' content='#ffffff' />
          <Matomo />
        </Head>
        <ApolloProvider client={apolloClient}>
          {/* TODO: https://github.com/zeit/next.js/issues/7479 */}
          <RouterContext.Provider value={makePublicRouterInstance(router)}>
            <Component {...pageProps} />
          </RouterContext.Provider>
        </ApolloProvider>
      </ConfigProvider>
    )
  }
}

export default withApollo(Creators)
