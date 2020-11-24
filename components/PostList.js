import { Empty, Spin } from 'antd'
import { Fragment } from 'react'
import PostCell from '../components/PostCell'

const PostList = ({ list, loading }) => {
  const renderList = () => {
    if (!list.length) {
      return (
        <Empty description='暂无内容' image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )
    }
    return list.map(post => (
      <Fragment key={post.id}>
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
export default PostList
