import { readFileSync } from 'fs'
import { resolve } from 'path'
import get from 'lodash/get'
import { gql } from '@apollo/client'
import Handlebars from 'handlebars'
import initApollo from '../../../libs/init-apollo'
import { red } from '../../../libs/colors'

export const GET_PRODUCT = gql`
query($id: String!) {
  product(id: $id) {
    id
    name
    likeCount
  }
}
`

const template = Handlebars.compile(readFileSync(resolve('./templates/vote.svg.hbs'), { encoding: 'utf8' }))

export default async (req, res) => {
  const apollo = initApollo()
  res.setHeader('Content-Type', 'image/svg+xml')
  res.statusCode = 200
  const { id, theme = 'light' } = req.query
  const radius = Number(req.query.radius) || 10
  const data = await apollo.query({
    query: GET_PRODUCT,
    variables: {
      id
    }
  })
  const product = get(data, 'data.product')
  if (!product) return res.statusCode(404).end()
  const color = theme === 'dark' ? '#FFFFFF' : red
  const titleColor = theme === 'dark' ? '#FFFFFF' : '#505050'
  const tipColor = theme === 'dark' ? '#FFFFFF' : '#707070'
  const backgroundColor = theme === 'dark' ? '#24273f' : '#F5F5F5'
  const strokeColor = theme === 'dark' ? '#000000' : '#FFFFFF'
  res.send(template({
    radius,
    color,
    titleColor,
    tipColor,
    backgroundColor,
    strokeColor,
    title: product.name.length > 10 ? `${product.name.slice(0, 9)}...` : product.name,
    count: Math.min(product.likeCount, 999),
    x: [0, 7.9, 4.8, 1][product.likeCount.toString().length],
    name: process.env.NEXT_PUBLIC_NAME,
    product
  }))
}
