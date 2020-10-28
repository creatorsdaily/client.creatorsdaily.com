import { Empty, Spin } from 'antd'
import Active from './Active'

const ActiveList = ({ list, loading }) => {
  console.log(list)
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

export default ActiveList
