import get from 'lodash/get'
import { gql } from '@apollo/client'
import initApollo from '../../libs/init-apollo'
import createFeed from '../../libs/feed'
import { productFragment, userFragment } from '../../queries'

export const GET_PRODUCTS = gql`
query($page: Int, $size: Int, $topic: [String!], $keyword: [String!]) {
  getProducts(page: $page, size: $size, topic: $topic, keyword: $keyword) {
    total
    data {
      codeCount
      ${productFragment}
      content
      discoverer {
        ${userFragment}
      }
    }
  }
}
`

export default async (req, res) => {
  const apollo = initApollo()
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  const data = await apollo.query({
    query: GET_PRODUCTS
  })
  const list = get(data, 'data.getProducts.data', [])
  const feed = createFeed(list)
  res.end(feed.json1())
}
