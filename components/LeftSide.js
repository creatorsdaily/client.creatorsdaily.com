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
margin-bottom: 24px;
`

const StyledProductCell = styled(ProductCell)`
margin-bottom: 12px;
`

export default () => {
  const { data, loading } = useQuery(GET_PRODUCTS, {
    variables: {
      order: 'likes',
      size: 10
    }
  })
  const products = get(data, 'getProducts.data', [])
  return (
    <Container>
      <SmallTitle>产品好评榜</SmallTitle>
      <Skeleton active loading={loading}>
        {products.map(x => (
          <StyledProductCell key={x.id} {...x} size='mini' />
        ))}
      </Skeleton>
    </Container>
  )
}
