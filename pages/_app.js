import App from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { ConfigProvider, Empty, notification } from 'antd'
import gql from 'graphql-tag'
import { ApolloProvider } from '@apollo/react-common'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import { Router, makePublicRouterInstance } from 'next/router'
import styled from 'styled-components'
import withApollo from '../libs/with-apollo'
import Matomo from '../components/Matomo'
import OneSignal from '../components/OneSignal'
import { VIEWER } from '../queries'
import Error from './_error'
import '../libs/day'
import '../styles/index.less'

const StyledIcon = styled.img`
  width: 49px;
  height: 49px;
  margin-left: -10px;
`

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

const CreatorsApp = ({ pageProps, router, Component, apolloClient }) => {
  useEffect(() => {
    Router.events.on('routeChangeStart', handleRouteChangeStart)
    return () => Router.events.off('routeChangeStart', handleRouteChangeStart)
  }, [])

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }, [])

  useEffect(() => {
    window.addEventListener('appinstalled', handleAppInstalled)
    return () => window.removeEventListener('appinstalled', handleAppInstalled)
  }, [])

  const handleRouteChangeStart = url => {
    if (window && window._paq) {
      window._paq.push(['setCustomUrl', url])
      window._paq.push(['setDocumentTitle', document.title])
      window._paq.push(['trackPageView'])
    }
  }

  const handleBeforeInstallPrompt = e => {
    const key = 'installAppNotification'
    notification.open({
      message: '安装应用',
      description: `点击安装「${process.env.NAME}」应用`,
      icon: (<StyledIcon src='/apple-icon-180x180.png' />),
      duration: 0,
      placement: 'bottomRight',
      key,
      onClick () {
        e.prompt()
        notification.close(key)
      }
    })
  }

  const handleAppInstalled = () => {
    notification.open({
      message: '应用安装成功',
      description: `安装成功，点击图标直接打开「${process.env.NAME}」`,
      icon: (<StyledIcon src='/apple-icon-180x180.png' />),
      duration: 3000,
      placement: 'bottomRight'
    })
  }

  if (pageProps.statusCode) {
    Component = Error
  }

  return (
    <ConfigProvider locale={zhCN} renderEmpty={renderEmpty}>
      <Head>
        <title>{process.env.NAME} | {process.env.SLOGAN}</title>
        <meta key='description' name='description' content={process.env.DESCRIPTION} />
        <meta key='keywords' name='keywords' content={process.env.KEYWORDS} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
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
        <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
        <Matomo />
        <OneSignal />
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

class Creators extends App {
  constructor (props) {
    super(props)
    const { viewer } = props
    if (!process.browser || !viewer) return
    const OneSignal = window.OneSignal || []
    OneSignal.push(function () {
      OneSignal.setExternalUserId(viewer.id)
      OneSignal.getUserId(id => {
        if (id === viewer.oneSignal) return
        props.apolloClient.mutate({
          mutation: UPDATE_USER,
          variables: {
            user: {
              id: viewer.id,
              oneSignal: id
            }
          }
        })
      })
    })
  }

  static async getInitialProps (appContext) {
    const appProps = await App.getInitialProps(appContext)
    const { data } = await appContext.ctx.apolloClient.query({
      query: VIEWER
    }).catch(() => ({}))
    const viewer = data && data.viewer
    return {
      ...appProps,
      pageProps: {
        ...appProps.pageProps,
        viewer
      },
      viewer
    }
  }

  render () {
    return (
      <CreatorsApp {...this.props} />
    )
  }
}

export default withApollo(Creators)
