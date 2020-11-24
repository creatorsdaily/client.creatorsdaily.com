import React, { useState } from 'react'
import { Empty, Input, Modal, Spin } from 'antd'
import useToggle from 'react-use/lib/useToggle'
import { useLazyQuery, useQuery } from '@apollo/client'
import get from 'lodash/get'
import noop from 'lodash/noop'
import styled from 'styled-components'
import ProductList from '../queries/ProductList.gql'
import SearchProduct from '../queries/SearchProduct.gql'
import ProductCell from '../components/ProductCell'

const StyledProductCell = styled(ProductCell)`
border: 0;
box-shadow: none;
transition: background 0.25s;
:hover {
  border: 0;
  background: rgba(89, 156, 243, 0.1);
}
`

const List = styled.div`
max-height: 380px;
overflow: auto;
padding-top: 8px;
`

const { Search } = Input

const useProductSelectModal = (handleSelect = noop) => {
  const [visible, setVisible] = useToggle(false)
  const [keyword, setKeyword] = useState()
  const { loading, data } = useQuery(ProductList)
  const [search, { loading: searchLoading, data: searchData }] = useLazyQuery(SearchProduct)
  const show = () => {
    setVisible(true)
  }
  const hide = () => {
    setVisible(false)
    setKeyword()
  }
  const handleSearch = keyword => {
    setKeyword(keyword)
    search({
      variables: {
        keyword
      }
    })
  }
  const list = (keyword && get(searchData, 'searchProducts.data')) || get(data, 'getProducts.data', [])
  const renderList = () => {
    if (!list.length) {
      return (<Empty description='暂无内容' image={Empty.PRESENTED_IMAGE_SIMPLE} />)
    }
    return list.map(x => (
      <StyledProductCell
        key={x.id} {...x} size='small' disabled onClick={() => {
          handleSelect(x.id)
          hide()
        }}
      />
    ))
  }
  return [(
    <Modal
      key='create-options-modal'
      width={420}
      visible={visible}
      title='选择产品'
      onCancel={hide}
      footer={null}
      destroyOnClose
    >
      <Search placeholder='搜索产品' size='large' loading={searchLoading} onSearch={handleSearch} />
      <Spin spinning={loading || searchLoading}>
        <List>
          {renderList()}
        </List>
      </Spin>
    </Modal>
  ), show, hide]
}
export default useProductSelectModal
