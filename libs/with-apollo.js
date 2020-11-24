import React from 'react'
import PropTypes from 'prop-types'
import cookie from 'cookie'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import initApollo from './init-apollo'
import graphqlError from './graphql-error'

const withApollo = (PageComponent, { ssr = true } = {}) => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApollo(apolloState, { getToken })
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.')
    }

    WithApollo.displayName = `withApollo(${displayName})`

    WithApollo.propTypes = {
      apolloClient: PropTypes.object,
      apolloState: PropTypes.object
    }
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const { AppTree } = ctx

      const apolloClient = (ctx.apolloClient = initApollo(
        {},
        {
          getToken: () => getToken(ctx.req)
        }
      ))
      const pageProps = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(ctx)
        : {}

      if (typeof window === 'undefined') {
        // 响应完成时，没必要继续渲染
        if (ctx.res && ctx.res.finished) {
          return {}
        }

        if (ssr) {
          try {
            const { getDataFromTree } = await import('@apollo/client/react/ssr')
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient
                }}
              />
            )
          } catch (error) {
            if (graphqlError(error)[0].statusCode === 404 && pageProps) {
              pageProps.statusCode = 404
            }
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error)
          }
        }

        Head.rewind()
      }

      const apolloState = apolloClient.cache.extract()
      return {
        ...pageProps,
        apolloState
      }
    }
  }

  return WithApollo
}

export function getToken (req) {
  let cookieStr = ''
  if (req) {
    cookieStr = req.headers.cookie || ''
  } else if (typeof document !== 'undefined') {
    cookieStr = document.cookie
  }
  const cookies = cookie.parse(cookieStr)
  return cookies.token
}
export default withApollo
