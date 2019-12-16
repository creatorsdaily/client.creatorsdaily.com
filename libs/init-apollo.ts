import { ApolloClient, InMemoryCache, NormalizedCacheObject, HttpLink } from 'apollo-boost'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities'

interface Options {
  getToken?(): string
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

function create (initialState: NormalizedCacheObject, {
  getToken
}: Options) {
  const isBrowser = typeof window !== 'undefined'
  const httpLink = new HttpLink({
    uri: process.env.GRAPHQL, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    fetch: isBrowser ? undefined : fetch
  })
  const authLink = setContext((_, { headers }) => {
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
  let link = authLink.concat(httpLink)
  if (isBrowser) {
    const wsLink = new WebSocketLink({
      uri: process.env.GRAPHQL_WS!,
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
    });
    link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      link,
    )
  }
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link,
    cache: new InMemoryCache().restore(initialState)
  })
}

export default function initApollo (
  initialState: NormalizedCacheObject = {},
  options: Options = {}
): ApolloClient<NormalizedCacheObject> {
  if (typeof window === 'undefined') {
    return create(initialState, options)
  }
  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}
