import { forwardRef, useEffect, useState } from 'react'
import { Button, Input, Spin } from 'antd'
import get from 'lodash/get'
import { useLazyQuery, useQuery } from '@apollo/client'
import styled from 'styled-components'
import noop from 'lodash/noop'
import uniqBy from 'lodash/uniqBy'
import { CloseOutlined } from '@ant-design/icons'
import { SEARCH_PRODUCTS } from '../queries'
import ProductList from '../queries/ProductList.gql'
import ProductDetail from '../queries/ProductDetail.gql'
import QuestionDetail from '../queries/QuestionDetail.gql'
import ProductCell from './ProductCell'

const { Search } = Input

const List = styled.ul`
  padding: 0;
  list-style: none;
  padding-top: 12px;
  margin: 0;
  height: 312px;
  overflow-y: auto;
  li {
    margin-bottom: 12px;
    cursor: pointer;
    transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:last-child {
      margin-bottom: 0;
    }
    :hover {
      background: #F5F5FF;
    }
  }
`

const ProductContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const Product = ({ product, closeable, onClose }) => {
  const renderClose = () => {
    if (!closeable) return null
    return (<Button icon={<CloseOutlined />} type='link' onClick={onClose} />)
  }
  return (
    <ProductContainer>
      <ProductCell {...product} size='mini' disabled overflow />
      {renderClose()}
    </ProductContainer>
  )
}

const DataProduct = ({ id, closeable, onClose }) => {
  const { loading, data } = useQuery(ProductDetail, {
    variables: {
      id
    }
  })
  const product = get(data, 'product')
  return (
    <Spin spinning={loading}>
      <Product product={product} closeable={closeable} onClose={onClose} />
    </Spin>
  )
}

export default forwardRef((props, ref) => {
  const { defaultValue, value: nValue, onChange = noop, fixed, question, ...rest } = props
  const [value, setValue] = useState(nValue || defaultValue)
  const { data: defaultProducts, loading } = useQuery(ProductList)
  const { data: questionData, loading: questionLoading } = useQuery(QuestionDetail, {
    variables: {
      id: question
    },
    skip: !question
  })
  const [search, { data, loading: searchLoading }] = useLazyQuery(SEARCH_PRODUCTS)
  const searchList = get(data, 'searchProducts.data', [])
  useEffect(() => setValue(nValue), [nValue])
  const products = searchList.length ? searchList : uniqBy([].concat(
    get(questionData, 'getQuestion.options', []).map(x => x.product),
    get(defaultProducts, 'getProducts.data', [])
  ), 'id')
  const fireChange = v => {
    setValue(v)
    onChange(v)
  }
  const handleClose = () => fireChange()
  const renderProduct = () => {
    if (!value) return null
    const product = products.find(x => x.id === value)
    if (!product) return null
    return (
      <DataProduct id={value} closeable={!fixed} onClose={handleClose} />
    )
  }
  const handleSearch = keyword => {
    search({
      variables: {
        keyword
      }
    })
  }
  const renderSelect = () => {
    if (value) return null
    return (
      <>
        <Search placeholder='搜索产品' size='large' loading={searchLoading} onSearch={handleSearch} />
        <Spin spinning={loading || questionLoading || searchLoading}>
          <List>
            {products.map((product) => (
              <li key={product.id} onClick={() => fireChange(product.id)}>
                <Product product={product} />
              </li>
            ))}
          </List>
        </Spin>
      </>
    )
  }
  return (
    <div {...rest}>
      {renderProduct()}
      {renderSelect()}
    </div>
  )
})
