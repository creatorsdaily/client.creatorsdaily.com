import cookie from 'component-cookie'
import { VIEWER } from '../queries'

export default async client => {
  const { data: { viewer } } = await client.query({
    query: VIEWER,
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
