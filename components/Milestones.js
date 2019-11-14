import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import { Button, Divider, Spin } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'
import { useState } from 'react'
import { GET_MILESTONES } from '../queries'
import IPFSImage from './IPFSImage'
import Box from './Box'
import Time from './Time'

const ProductIcon = styled(IPFSImage)`
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-right: 10px;
`

const ProductCell = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`

const ProductName = styled.div`
  font-weight: bold;
  font-size: 12px;
  color: #505050;
`

const MilestoneContent = styled.div`
font-size: 12px;
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
color: #333;
span {
  color: #606060;
}
`

const MilestoneTitle = styled.h3`
font-size: 16px;
margin: 0;
`

const MilestoneBox = styled(Box)`
padding: 10px;
`

const StyledDivider = styled(Divider)`
margin: 10px 0;
`

export default ({ productId, size = 15 }) => {
  const [page, setPage] = useState(1)
  const query = [GET_MILESTONES, {
    size,
    productId
  }]
  const { data, loading, fetchMore } = useQuery(query[0], {
    variables: query[1],
    notifyOnNetworkStatusChange: true
  })
  const milestones = get(data, 'getMilestones.data', [])
  const total = get(data, 'getMilestones.total', 0)
  const handleFetchMore = () => {
    fetchMore({
      variables: {
        page: page + 1
      },
      updateQuery (prev, { fetchMoreResult }) {
        if (!fetchMoreResult) return prev
        setPage(page + 1)
        return {
          ...prev,
          getMilestones: {
            ...prev.getMilestones,
            data: [
              ...prev.getMilestones.data,
              ...fetchMoreResult.getMilestones.data
            ]
          }
        }
      }
    })
  }
  const renderMore = () => {
    if (page * size >= total) return null
    return (
      <Button style={{ marginBottom: 24 }} type='link' block loading={loading} onClick={handleFetchMore}>加载更多</Button>
    )
  }
  const renderMilestones = () => {
    return milestones.map(x => {
      const product = x.product
      return (
        <MilestoneBox key={x.id}>
          <Link
            href='/[id]/milestones/[milestoneId]'
            as={`/${product.id}/milestones/${x.id}`}
          >
            <a>
              <ProductCell>
                <ProductIcon size='small' alt={product.name} hash={product.icon && product.icon.hash && `${product.icon.hash}-160-160-contain`} />
                <ProductName>{product.name}</ProductName>
                <div>
                  <Divider type='vertical' />
                </div>
                <MilestoneTitle>{x.title}</MilestoneTitle>
              </ProductCell>
              <StyledDivider />
              <MilestoneContent>
                <span><Time time={x.createdAt} /></span>
                <Divider type='vertical' />
                {x.content}
              </MilestoneContent>
            </a>
          </Link>
        </MilestoneBox>
      )
    })
  }
  return (
    <Spin spinning={loading}>
      {renderMilestones()}
      {renderMore()}
    </Spin>
  )
}
