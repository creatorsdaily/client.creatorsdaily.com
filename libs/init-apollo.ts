import { ApolloClient, InMemoryCache, NormalizedCacheObject, HttpLink } from 'apollo-boost'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'

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
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: authLink.concat(httpLink),
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
