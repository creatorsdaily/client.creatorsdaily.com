import styled from 'styled-components'
import { Skeleton } from 'antd'
import get from 'lodash/get'
import { useQuery } from '@apollo/react-hooks'
import { GET_PRODUCTS } from '../queries'
import SmallTitle from './SmallTitle'
import Box from './Box'
import ProductCell from './ProductCell'

const Container = styled(Box)`
padding: 6px 16px 0;
`

export default () => {
  const { data, loading } = useQuery(GET_PRODUCTS, {
    variables: {
      order: 'likes',
      size: 10
    }
  })
  const products = get(data, 'getProducts.data', [])
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
    <Container>
      <SmallTitle>产品好评榜</SmallTitle>
      {renderProductList()}
    </Container>
  )
}
