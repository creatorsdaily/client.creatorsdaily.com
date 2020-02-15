import { Empty, Spin } from 'antd'
import styled from 'styled-components'
import { Fragment } from 'react'
import PostCell from '../components/PostCell'
import Time from '../components/Time'

const TimeContainer = styled.div`
line-height: 30px;
font-size: 12px;
font-weight: bold;
text-align: center;
margin-bottom: 24px;
`

export default ({ list, loading }) => {
  const renderList = () => {
    if (!list.length) {
      return (
        <Empty description='暂无内容' image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )
    }
    return list.map(post => (
      <Fragment key={post.id}>
        <TimeContainer>
          <Time time={post.createdAt} format='YYYY 年 M 月 D 日' />
        </TimeContainer>
        <PostCell {...post} />
      </Fragment>
    ))
  }
  return (
    <Spin spinning={loading}>
      {renderList()}
    </Spin>
  )
}
