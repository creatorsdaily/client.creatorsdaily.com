import cookie from 'component-cookie'
import Viewer from '../queries/Viewer.gql'

export default async client => {
  const { data: { viewer } } = await client.query({
    query: Viewer,
    fetchPolicy: 'cache-and-network'
  })
  if (!viewer) {
    return null
  }
  if (viewer.token && process.browser) {
    cookie('token', viewer.token, {
      path: '/',
      maxage: 7 * 24 * 60 * 60 * 1000
    })
  }
  return viewer
}
