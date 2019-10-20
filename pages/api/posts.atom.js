import get from 'lodash/get'
import initApollo from '../../libs/init-apollo'
import { posts } from '../../libs/feed'
import { GET_POSTS } from '../../queries'

const apollo = initApollo()

export default async (req, res) => {
  res.setHeader('Content-Type', 'application/xml')
  res.statusCode = 200
  const data = await apollo.query({
    query: GET_POSTS
  })
  const list = get(data, 'data.getPosts.data', [])
  const feed = posts(list)
  res.end(feed.rss2())
}
