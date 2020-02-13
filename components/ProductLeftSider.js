import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import { Skeleton } from 'antd'
import { GET_PRODUCTS } from '../queries'
import Users from './Users'
import Box from './Box'
import SmallTitle from './SmallTitle'
import ProductCell from './ProductCell'

const Container = styled(Box)`
padding: 6px 16px 0;
`

export default ({ likes = [], loading: productLoading }) => {
  const { data, loading } = useQuery(GET_PRODUCTS, {
    variables: {
      order: 'likes',
      size: 10
    }
  })
  const products = get(data, 'getProducts.data', [])
  const renderLikes = () => {
    if (!likes.length) return null
    return (
      <Container>
        <SmallTitle>喜欢它的用户</SmallTitle>
        {productLoading ? <Skeleton active={loading} /> : <Users list={likes} />}
      </Container>
    )
  }
  const renderProductList = () => {
    if (loading) {
      return (
        <Skeleton active={loading} />
      )
    }
    return products.map(x => (
      <ProductCell key={x.id} {...x} size='mini' />
    ))
  }
  return (
    <>
      {renderLikes()}
      <Container>
        <SmallTitle>产品好评榜</SmallTitle>
        {renderProductList()}
      </Container>
    </>
  )
}
