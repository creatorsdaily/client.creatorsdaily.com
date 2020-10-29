import { Empty, Spin } from 'antd'
import { useQuery } from '@apollo/client'
import get from 'lodash/get'
import ActiveListQuery from '../queries/ActiveList.gql'
import Active from './Active'

const ActiveList = ({ list, loading }) => {
  const renderList = () => {
    if (!list.length) {
      return (
        <Empty description='暂无内容' image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )
    }
    return list.map(active => {
      return (
        <Active active={active} key={active.id} />
      )
    })
  }
  return (
    <Spin spinning={loading}>
      {renderList()}
    </Spin>
  )
}

export const ActiveListContainer = ({ user, timeline = 'public', page = 1, size = 30 }) => {
  const { data, loading } = useQuery(ActiveListQuery, {
    variables: {
      user,
      timeline: timeline,
      page: page,
      size: size
    }
  })
  const list = get(data, 'getActives.data') || []
  return (<ActiveList list={list} loading={loading} />)
}

export default ActiveList
