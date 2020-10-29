import React from 'react'
import PropTypes from 'prop-types'
import cookie from 'cookie'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import initApollo from './init-apollo'
import graphqlError from './graphql-error'

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
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
    // Find correct display name
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'

    // Warn if old way of installing apollo is used
    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.')
    }

    // Set correct display name for devtools
    WithApollo.displayName = `withApollo(${displayName})`

    // Add some prop types
    WithApollo.propTypes = {
      // Used for getDataFromTree rendering
      apolloClient: PropTypes.object,
      // Used for client/server rendering
      apolloState: PropTypes.object
    }
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const { AppTree } = ctx

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apolloClient = (ctx.apolloClient = initApollo(
        {},
        {
          getToken: () => getToken(ctx.req)
        }
      ))
      const pageProps = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(ctx)
        : {}

      // Only on the server
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return {}
        }

        if (ssr) {
          try {
            // Run all GraphQL queries
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

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract()
      return {
        ...pageProps,
        apolloState
      }
    }
  }

  return WithApollo
}

/**
 * Get the user token from cookie
 * @param {Object} req
 */
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
