import styled from 'styled-components'
import { Spin } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import { GET_PRODUCT } from '../queries'
import ProductHeader from './ProductHeader'
import ProductContent from './ProductContent'
import ProductFiles from './ProductFiles'

const StyledContent = styled(ProductContent)`
  padding: 24px;
  background: #FFF;
  margin-bottom: 24px;
`

const Product = ({ id, name, description, content, topics, icon, medias = [], full = false }) => {
  return (
    <div>
      <ProductHeader id={id} topics={topics} description={description} icon={icon} name={name} />
      <ProductFiles medias={medias} />
      <StyledContent content={content} full={full} />
    </div>
  )
}

export const ProductContainer = ({ id, full = false }) => {
  if (!id) return null
  const { loading, data } = useQuery(GET_PRODUCT, {
    variables: {
      id
    }
  })

  const product = get(data, 'product', {})
  return (
    <Spin spinning={loading}>
      <Product {...product} full={full} />
    </Spin>
  )
}

export default Product
