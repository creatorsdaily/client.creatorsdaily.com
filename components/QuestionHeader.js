import styled from 'styled-components'
import { Button, Col, Divider, Row } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Counter from './Counter'
import RecommendTooltip from './RecommendTooltip'
import Topics from './Topics'

const Header = styled.div`
  padding: 0 16px;
  margin: 16px 0;
`

export default ({ options, topics, onClick }) => {
  const renderTopics = () => {
    if (!topics.length) return null
    return (
      <>
        <Divider type='vertical' />
        <Topics
          checkable
          list={topics.slice(0, 5)}
          href='/questions'
        />
      </>
    )
  }
  const renderCounterContent = () => {
    if (!options.length) {
      return (
        <Counter>暂无推荐</Counter>
      )
    }
    return (
      <Counter>
        共<span>{options.length}</span>项推荐
      </Counter>
    )
  }
  const renderButton = () => {
    if (!options.length) {
      return null
    }
    return (
      <RecommendTooltip>
        <Button icon={<PlusOutlined />} style={{ float: 'right' }} onClick={onClick}>我要推荐</Button>
      </RecommendTooltip>
    )
  }
  return (
    <Header>
      <Row type='flex'>
        <Col xl={18} lg={18} md={18} sm={16} xs={16} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {renderCounterContent()}
          {renderTopics()}
        </Col>
        <Col xl={6} lg={6} md={6} sm={8} xs={8}>
          {renderButton()}
        </Col>
      </Row>
    </Header>
  )
}
