import App from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { ConfigProvider, Empty } from 'antd'
import { gql } from '@apollo/client'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { Router } from 'next/router'
import BaiduTongji from '../components/BaiduTongji'
import Viewer from '../queries/Viewer.gql'
import Error from './_error'
import '../styles/index.less'

const UPDATE_USER = gql`
mutation($user: IUser!) {
  updateUser(user: $user) {
    id
    oneSignal
  }
}
`

const renderEmpty = () => (
  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
)

const CreatorsApp = ({ pageProps, Component }) => {
  useEffect(() => {
    Router.events.on('routeChangeStart', handleRouteChangeStart)
    return () => Router.events.off('routeChangeStart', handleRouteChangeStart)
  }, [])

  const handleRouteChangeStart = url => {
    if (window && window._paq) {
      window._paq.push(['setCustomUrl', url])
      window._paq.push(['setDocumentTitle', document.title])
      window._paq.push(['trackPageView'])
    }
  }

  if (pageProps.statusCode) {
    Component = Error
  }

  return (
    <ConfigProvider locale={zhCN} renderEmpty={renderEmpty}>
      <Head>
        <title>{process.env.NEXT_PUBLIC_NAME} - {process.env.NEXT_PUBLIC_SLOGAN}</title>
        <meta key='description' name='description' content={process.env.NEXT_PUBLIC_DESCRIPTION} />
        <meta key='keywords' name='keywords' content={process.env.NEXT_PUBLIC_KEYWORDS} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta key='og-title' property='og:title' content={process.env.NEXT_PUBLIC_SLOGAN} />
        <meta key='og-url' property='og:url' content={process.env.NEXT_PUBLIC_INDEX} />
        <meta key='og-site-name' property='og:site_name' content={process.env.NEXT_PUBLIC_NAME} />
        <meta key='og-image' property='og:image' content='/icon.png' />
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
        <link href='/api/atom' type='application/atom+xml' rel='alternate' title={`${process.env.NEXT_PUBLIC_NAME} ATOM Feed`} />
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
        <meta name='theme-color' content='#ffffff' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
        <BaiduTongji id={process.env.NEXT_PUBLIC_BAIDU_TONGJI} />
      </Head>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}

class Creators extends App {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <CreatorsApp {...this.props} />
    )
  }
}

export default Creators
