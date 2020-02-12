import { forwardRef, useEffect, useState } from 'react'
import { Button, Input, Spin } from 'antd'
import get from 'lodash/get'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import noop from 'lodash/noop'
import uniqBy from 'lodash/uniqBy'
import { CloseOutlined } from '@ant-design/icons'
import { GET_PRODUCT, GET_PRODUCTS } from '../queries'
import IPFSImage from './IPFSImage'

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
`

const ProductImage = styled(IPFSImage)`
  width: 40px;
  height: 40px;
  object-fit: contain;
`

const ProductName = styled.div`
  margin-left: 12px;
  flex: 1;
`

const Product = ({ name, icon = {}, closeable, onClose }) => {
  const renderClose = () => {
    if (!closeable) return null
    return (<Button icon={<CloseOutlined />} type='link' onClick={onClose} />)
  }
  return (
    <ProductContainer>
      <ProductImage size='small' hash={icon && icon.hash} />
      <ProductName>{name}</ProductName>
      {renderClose()}
    </ProductContainer>
  )
}

const DataProduct = ({ id, icon, closeable, onClose }) => {
  const { loading, data } = useQuery(GET_PRODUCT, {
    variables: {
      id
    }
  })
  const product = get(data, 'product')
  return (
    <Spin spinning={loading}>
      <Product name={product && product.name} closeable={closeable} onClose={onClose} icon={icon} />
    </Spin>
  )
}

export default forwardRef((props, ref) => {
  const { defaultValue, value: nValue, onChange = noop, fixed, question, ...rest } = props
  const [value, setValue] = useState(nValue || defaultValue)
  const { data: defaultProducts } = useQuery(GET_PRODUCTS)
  const { loading, data, refetch } = useQuery(GET_PRODUCTS)
  useEffect(() => setValue(nValue), [nValue])
  const products = uniqBy([].concat(
    get(data, 'getProducts.data', []),
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
      <DataProduct id={value} closeable={!fixed} icon={product.icon} onClose={handleClose} />
    )
  }
  const handleSearch = keyword => {
    const variables = {
      keyword: [keyword]
    }
    if (keyword) {
      variables.topic = []
    }
    refetch(variables)
  }
  const renderSelect = () => {
    if (value) return null
    return (
      <>
        <Search placeholder='搜索产品' size='large' onSearch={handleSearch} />
        <Spin spinning={loading}>
          <List>
            {products.map(({ id, icon, name }) => (
              <li key={id} onClick={() => fireChange(id)}>
                <Product name={name} icon={icon} />
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
