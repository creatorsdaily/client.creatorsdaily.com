import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import fetch from 'isomorphic-unfetch'
import possibleTypes from '../possibleTypes'
// import { persistCache } from 'apollo-cache-persist'

let apolloClient = null

function create (initialState, {
  getToken
}) {
  const isBrowser = typeof window !== 'undefined'
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    fetch: isBrowser ? undefined : fetch
  })
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => {
      if (!getToken) {
        return { headers }
      }
      const token = getToken()
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ''
        }
      }
    })

    return forward(operation)
  })
  let link = authLink.concat(httpLink)
  if (isBrowser) {
    const wsLink = new WebSocketLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_WS,
      options: {
        reconnect: true,
        connectionParams: () => {
          if (!getToken) return {}
          const token = getToken()
          return {
            headers: {
              authorization: token ? `Bearer ${token}` : ''
            }
          }
        }
      }
    })
    link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      wsLink,
      link
    )
  }
  const cache = new InMemoryCache({
    possibleTypes
  }).restore(initialState)
  // if (isBrowser) persistCache({ cache, storage: localStorage })
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link,
    cache
  })
}

export default function initApollo (
  initialState,
  options = {}
) {
  if (typeof window === 'undefined') {
    return create(initialState, options)
  }
  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}
