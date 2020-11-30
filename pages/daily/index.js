import { useQuery } from '@apollo/client'
import get from 'lodash/get'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import day from 'dayjs'
import { useRouter } from 'next/router'
import withApollo from '../../libs/with-apollo'
import WeChat from '../../layouts/WeChat'
import ProductListDetail from '../../queries/ProductListDetail.gql'

const Container = styled.div`
color: rgb(58, 65, 69);
font-size: 16px;
letter-spacing: 0.5px;
caret-color: rgb(58, 65, 69);
white-space: normal;
text-size-adjust: auto;
font-family: -apple-system-font, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", Arial, sans-serif;
`

const H2 = styled.h2`
break-inside: avoid;
color: rgb(54, 54, 54);
line-height: 40px;
margin-top: 10px;
margin-bottom: 40px;
font-size: 24px;
text-align: center;
letter-spacing: 0px;
padding-top: 22px;
span {
  font-weight: bold;
  border-bottom-width: 14px;
  border-bottom-style: solid;
  border-bottom-color: #FCE366;
  padding-left: 5px;
  padding-right: 5px;
  display: inline-block;
  line-height: 4px;
  color: rgb(52, 53, 54);
}
`

const Product = styled.section`
border-bottom: 1px solid #C0C0C0;
margin-bottom: 48px;
padding-bottom: 48px;
h1, h2, h3, h4, h5, h6 {
  font-size: 16px;
  font-weight: bold;
}
p:last-child {
  margin: 0;
}
`

const ProductName = styled.h3`
break-inside: avoid;
color: rgb(54, 54, 54);
line-height: 1.5;
font-size: 20px !important;
margin-bottom: 12px;
`

const ProductDescription = styled.p`
margin-bottom: 12px;
`

const ProductTopics = styled.p`
line-height: 0;
margin-bottom: 24px;
color: #DB5846;
`

const ProductTopic = styled.span`
font-size: 12px;
border-radius: 3px;
margin-right: 8px;
display: inline-block;
line-height: 20px;
`

const ProductCard = styled.img`
border-radius: 16px;
max-width: 100%;
margin-bottom: 24px;
`

const Welcome = styled.p`
font-size: 14px;
line-height: 20px;
span {
  font-weight: bold;
  color: rgb(52, 53, 54);
}
`

const Tip = styled.p`
font-size: 12px;
line-height: 20px;
span {
  font-weight: bold;
  color: rgb(52, 53, 54);
}
`

const More = styled.p`
text-align: center;
font-size: 12px;
line-height: 20px;
color: #808080;
span {
  font-weight: bold;
  color: rgb(52, 53, 54);
}
`

export default withApollo(() => {
  const { query: { ids } } = useRouter()
  const end = day().startOf('date').valueOf()
  const start = day(end).subtract(1, 'day').valueOf()
  // const start = day().startOf('date').valueOf()
  // const end = day(start).add(1, 'day').valueOf()
  let variables = {
    startTime: start,
    endTime: end
  }
  if (ids) {
    variables = {
      ids: typeof ids === 'string' ? [ids] : ids
    }
  }
  const { data } = useQuery(ProductListDetail, {
    variables: {
      size: 10,
      ...variables
    }
  })
  const list = get(data, 'getProducts.data', [])
  const renderProductTopics = topics => {
    if (!topics.length) return null
    return (
      <ProductTopics>
        {topics.map(x => (
          <ProductTopic key={x.id}>#{x.name}</ProductTopic>
        ))}
      </ProductTopics>
    )
  }
  const renderContent = content => {
    let source = content.slice(0, 300)
    if (content.length > 300) {
      source += '...'
    }
    const result = (
      <ReactMarkdown source={source} />
    )
    if (content.length > 300) {
      return (
        <>
          {result}
          <More>更多内容请打开「创造者日报」查看</More>
        </>
      )
    }
    return result
  }
  return (
    <WeChat>
      <Container>
        <Welcome>嗨，又见面了！</Welcome>
        <Welcome>今日份的产品日报已送达，抽空看一看有什么有趣的新东西吧！如果你喜欢，记得关注一下。</Welcome>
        <H2>
          <span>
            今日产品
          </span>
        </H2>
        {list.map(x => (
          <Product key={x.id}>
            <ProductName>{x.name}</ProductName>
            <ProductDescription>{x.description}</ProductDescription>
            {renderProductTopics(x.topics)}
            <ProductCard src={`/api/${x.id}/card.png`} />
            {renderContent(x.content)}
          </Product>
        ))}
        <Tip>
          请不要吝啬你的「<span>点赞</span>」和「<span>在看</span>」，这是对我们最大的鼓励，谢谢。
        </Tip>
      </Container>
    </WeChat>
  )
})
