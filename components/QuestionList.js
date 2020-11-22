import { Empty, Spin } from 'antd'
import QuestionBox from '../components/QuestionBox'
import useCreateOptionModal from '../hooks/useCreateOptionModal'

const QuestionList = ({ list, loading }) => {
  const [modal, show] = useCreateOptionModal()
  const renderList = () => {
    if (!list.length) {
      return (
        <Empty description='暂无内容' image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )
    }
    return list.map(question => (
      <QuestionBox key={question.id} {...question} withContent onRecommend={() => show({ question: question.id })} />
    ))
  }
  return (
    <Spin spinning={loading}>
      {modal}
      {renderList()}
    </Spin>
  )
}
export default QuestionList
