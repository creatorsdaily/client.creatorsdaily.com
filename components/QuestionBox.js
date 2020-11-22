import styled from 'styled-components'
import Link from 'next/link'
import { Button, Statistic, Tag } from 'antd'
import { LikeOutlined, PlusOutlined } from '@ant-design/icons'
import QuestionHeader from './QuestionHeader'
import Meta from './Meta'
import RecommendTooltip from './RecommendTooltip'
import ProductCell from './ProductCell'

const Container = styled.header`
background: #FFF;
border: 1px solid #F0F0F0;
margin-bottom: 24px;
.ant-statistic-content-suffix {
  color: #999;
}
.ant-statistic {
  margin-top: 8px;
  transform: scale(0.53);
  transform-origin: left top;
}
`

const Title = styled.h1`
font-size: 20px;
margin: 16px;
`

const Content = styled.div`
padding: 16px;
`

const CenterContent = styled(Content)`
justify-content: center;
display: flex;
padding-bottom: 32px;
`

const LeftPart = styled.div`
width: 80px;
margin-right: 6px;
height: 60px;
overflow: hidden;
`

const OptionProduct = styled.div`
display: flex;
margin-bottom: 12px;
`

const StyledProductCell = styled(ProductCell)`
border: 1px solid #FFF;
background: #F5F5F5 !important;
flex: 1;
`

const Value = styled.div`
font-size: 12px;
margin-top: 12px;
span {
  padding: 0 4px;
  font-weight: bold;
}
`

const StyledMeta = styled(Meta)`
padding: 12px 16px;
box-sizing: content-box;
border-top: 1px solid #F0F0F0;
`

const QuestionBox = ({ id, name, user, options = [], topics = [], createdAt, onRecommend, children, withContent = false }) => {
  const renderTag = (rank) => {
    switch (rank) {
      case 1:
        return (<Tag color='#f50'>#1 强烈推</Tag>)
      case 2:
        return (<Tag color='#2db7f5'>#2 备选</Tag>)
      case 3:
        return (<Tag color='#87d068'>#3 第三</Tag>)
    }
  }
  const renderStatistic = (ups, downs, value) => {
    if (!ups || !downs) {
      return (
        <Value>共<span>{value}</span>分</Value>
      )
    }
    return (
      <Statistic title='推荐' value={ups.length} prefix={<LikeOutlined />} suffix={`/ ${downs.length}`} />
    )
  }
  const renderOption = ({ rank, ups, value, downs, product }) => {
    return (
      <div key={product.id}>
        <OptionProduct>
          <LeftPart>
            {renderTag(rank)}
            {renderStatistic(ups, downs, value)}
          </LeftPart>
          <StyledProductCell size='small' {...product} />
        </OptionProduct>
      </div>
    )
  }
  const renderContent = () => {
    if (!options.length) {
      return (
        <CenterContent>
          <RecommendTooltip>
            <Button type='primary' icon={<PlusOutlined />} onClick={onRecommend} size='large'>新问题？我要推荐产品</Button>
          </RecommendTooltip>
        </CenterContent>
      )
    }
    if (!withContent) {
      return null
    }
    return (
      <Content>
        {children || options.slice(0, 3).map(renderOption)}
      </Content>
    )
  }
  return (
    <Container>
      <QuestionHeader options={options} topics={topics} onClick={onRecommend} />
      <Link href='/questions/[id]' as={`/questions/${id}`}>
        <a>
          <Title>{name}</Title>
        </a>
      </Link>
      {renderContent()}
      <StyledMeta createdAt={createdAt} user={user}>提问</StyledMeta>
    </Container>
  )
}

export default QuestionBox
