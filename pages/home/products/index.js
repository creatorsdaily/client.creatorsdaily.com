import React from 'react'
import get from 'lodash/get'
import { Button, Divider, Table, Tabs, Tag, Tooltip } from 'antd'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import Link from 'next/link'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import Home from '../../../layouts/Home'
import withApollo from '../../../libs/with-apollo'
import ViewerCreatedProductList from '../../../queries/ViewerCreatedProductList.gql'
import ViewerDiscoveredProductList from '../../../queries/ViewerDiscoveredProductList.gql'
import usePagination from '../../../hooks/usePagination'
import IPFSImage from '../../../components/IPFSImage'
import Time from '../../../components/Time'
import useCanEditProduct from '../../../hooks/useCanEditProduct'

const { TabPane } = Tabs

const Content = styled.div`
background: #FFF;
padding: 0 16px 16px;
.ant-tag {
  margin-right: 0;
}
`
const Pagination = styled.div`
margin-top: 16px;
`
const ProductIcon = styled(IPFSImage)`
width: 32px;
height: 32px;
object-fit: contain;
`

const stateMapping = { published: '已发布', review: '审核中', rejected: '已拒绝', died: '已死亡' }
const stateColorMapping = { published: 'green', review: 'gold', rejected: 'red', died: 'magenta' }

const EditButton = ({ product }) => {
  const canEdit = useCanEditProduct(product)
  const button = (
    <Link href={`/${product.id}/editor`}>
      <a>
        <Button type='link' size='small' icon={<EditOutlined />} disabled={!canEdit}>编辑</Button>
      </a>
    </Link>
  )
  if (canEdit) {
    return button
  }
  return (
    <Tooltip placement='top' title='该产品已被创造者认领，无法编辑'>
      {button}
    </Tooltip>
  )
}

export default withApollo(() => {
  const { query, replace, pathname } = useRouter()
  const type = query.type || 'discovered'
  const {
    result: {
      loading,
      data
    },
    pagination
  } = usePagination({
    pageSize: 10,
    query: type === 'created' ? ViewerCreatedProductList : ViewerDiscoveredProductList,
    getTotal: ({ data }) => get(data, `viewer.${type}Products.total`, 0)
  })
  const products = get(data, `viewer.${type}Products.data`, [])
  const columns = [{
    title: '图标',
    dataIndex: 'icon',
    width: 48,
    render: (data) => {
      if (!data) return null
      return (
        <ProductIcon hash={data.hash} />
      )
    }
  }, {
    title: '名称',
    dataIndex: 'name',
    render: (data, item) => {
      return (
        <Link href={`/${item.id}`}>
          <a>
            <strong>{data}</strong>
          </a>
        </Link>
      )
    }
  }, {
    title: '状态',
    dataIndex: 'state',
    width: 68,
    render: (data) => {
      return (
        <Tag color={stateColorMapping[data]}>{stateMapping[data]}</Tag>
      )
    }
  }, {
    title: '喜欢',
    dataIndex: 'likeCount',
    width: 56,
    render: (data) => {
      return (
        <Tag>{data}</Tag>
      )
    }
  }, {
    title: '评论',
    dataIndex: 'commentCount',
    width: 56,
    render: (data) => {
      return (
        <Tag>{data}</Tag>
      )
    }
  }, {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 144,
    render: (data) => {
      return (
        <Tag>
          <Time time={data} format='YYYY-MM-DD HH:mm' />
        </Tag>
      )
    }
  }, {
    title: '操作',
    width: 165,
    render: (data) => {
      return (
        <>
          <EditButton product={data} />
          <Divider type='vertical' />
          <Button type='link' size='small' danger icon={<DeleteOutlined />} disabled>删除</Button>
        </>
      )
    }
  }]
  const handleChange = key => {
    replace(`${pathname}?type=${key}`, undefined, { shallow: true })
  }
  const renderContent = () => {
    return (
      <>
        <Table
          size='small'
          dataSource={products}
          columns={columns}
          rowKey='id'
          pagination={false}
          loading={loading}
        />
        <Pagination>{pagination}</Pagination>
      </>
    )
  }
  return (
    <Home>
      <Content>
        <Tabs activeKey={type} onChange={handleChange} tabBarExtraContent={(<Button icon={<PlusOutlined />}>发布产品</Button>)}>
          <TabPane tab='我的发现' key='discovered'>
            {renderContent()}
          </TabPane>
          <TabPane tab='我的创造' key='created'>
            {renderContent()}
          </TabPane>
        </Tabs>
      </Content>
    </Home>
  )
})
