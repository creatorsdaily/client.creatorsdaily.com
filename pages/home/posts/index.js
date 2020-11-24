import React from 'react'
import get from 'lodash/get'
import { Button, Divider, Table, Tag } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import Home from '../../../layouts/Home'
import withApollo from '../../../libs/with-apollo'
import usePagination from '../../../hooks/usePagination'
import ViewerPostList from '../../../queries/ViewerPostList.gql'
import IPFSImage from '../../../components/IPFSImage'

const Content = styled.div`
padding: 16px;
background: #FFF;
`

const Pagination = styled.div`
margin-top: 16px;
`

const ImageContainer = styled.div`
padding-top: 50%;
position: relative;
img {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  object-fit: cover;
}
`

const TableHeader = styled.div`
margin-bottom: 16px;
display: flex;
justify-content: flex-end;
`

const stateMapping = { published: '已发布', review: '审核中', rejected: '已拒绝' }
const stateColorMapping = { published: 'green', review: 'gold', rejected: 'red' }

export default withApollo(() => {
  const {
    result: {
      loading,
      data
    },
    pagination
  } = usePagination({
    query: ViewerPostList,
    pageSize: 10,
    getTotal: ({ data }) => get(data, 'viewer.posts.total', 0)
  })
  const posts = get(data, 'viewer.posts.data', [])
  const columns = [{
    title: '封面图',
    dataIndex: 'media',
    width: 120,
    render: (data) => {
      return (
        <ImageContainer>
          <IPFSImage hash={data.hash} />
        </ImageContainer>
      )
    }
  }, {
    title: '标题',
    dataIndex: 'title',
    render: (data, item) => {
      return (
        <Link href={`/posts/${item.id}`}>
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
    title: '操作',
    width: 165,
    render: (data) => {
      return (
        <>
          <Link href={`/home/posts/${data.id}`}>
            <a>
              <Button type='link' size='small' icon={<EditOutlined />}>编辑</Button>
            </a>
          </Link>
          <Divider type='vertical' />
          <Button type='link' size='small' danger icon={<DeleteOutlined />} disabled>删除</Button>
        </>
      )
    }
  }]
  return (
    <Home>
      <Content>
        <TableHeader>
          <Link href='/write'>
            <a>
              <Button icon={<EditOutlined />}>撰写文章</Button>
            </a>
          </Link>
        </TableHeader>
        <Table size='small' rowKey='id' dataSource={posts} columns={columns} loading={loading} pagination={false} />
        <Pagination>
          {pagination}
        </Pagination>
      </Content>
    </Home>
  )
})
