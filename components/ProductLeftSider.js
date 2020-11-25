import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import get from 'lodash/get'
import { Skeleton } from 'antd'
import ProductList from '../queries/ProductList.gql'
import Users from './Users'
import Box from './Box'
import SmallTitle from './SmallTitle'
import ProductCell from './ProductCell'

const Container = styled(Box)`
padding: 6px 16px 0;
margin-bottom: 24px;
`

const StyledProductCell = styled(ProductCell)`
margin-bottom: 12px;
`

const ProductLeftSider = ({ likes = [], loading: productLoading }) => {
  const { data, loading } = useQuery(ProductList, {
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
        <Skeleton active loading={productLoading}>
          <Users list={likes.slice(0, 20)} />
        </Skeleton>
      </Container>
    )
  }
  return (
    <>
      {renderLikes()}
      <Container>
        <SmallTitle>产品好评榜</SmallTitle>
        <Skeleton active loading={loading}>
          {products.map(x => (
            <StyledProductCell key={x.id} {...x} size='mini' />
          ))}
        </Skeleton>
      </Container>
    </>
  )
}
export default ProductLeftSider
