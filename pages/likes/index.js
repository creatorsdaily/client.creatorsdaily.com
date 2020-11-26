import React from 'react'
import Head from 'next/head'
import { Col, List, Row } from 'antd'
import styled from 'styled-components'
import Page from '../../layouts/Page'
import Container from '../../components/Container'
import RightSide from '../../components/RightSide'
import media from '../../libs/media'
import withApollo from '../../libs/with-apollo'
import Box from '../../components/Box'

const StyledContainer = styled(Container)`
margin: 24px auto;
`

const LikeContent = styled.div`
padding: 0 24px;
margin-bottom: 24px;
${media.sm`
  padding: 0;
`}
`

const RightLike = styled.img`
width: 160px;
display: block;
`

const LeftLike = styled(RightLike)`
transform: rotateY(180deg);
`

const StyledImage = styled.img`
width: 200px;
display: block;
margin-bottom: 24px;
`

const Content = styled(Box)`
padding: 24px;
display: flex;
align-items: center;
flex-direction: column;
margin-bottom: 24px;
`

const LikeImages = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

export default withApollo(() => {
  return (
    <Page>
      <Head>
        <title>喜欢 - {process.env.NEXT_PUBLIC_NAME}</title>
      </Head>
      <StyledContainer>
        <Row gutter={24}>
          <Col lg={18} md={17} xs={24}>
            <LikeContent>
              <h1>喜欢</h1>
              如果你真的<strong>抑制不住</strong>地喜欢我，那么非常欢迎你的赞赏，让你的喜欢来得更猛烈些吧！
            </LikeContent>
            <Content>
              <LikeImages>
                <LeftLike src='/like.png' />
                <StyledImage src='/wepay.png' />
                <RightLike src='/like.png' />
              </LikeImages>
              <h3>好心的老板们</h3>
              <div>网站纯兴趣驱动运营，你的「喜欢」将会用于支持她的发展</div>
              <List
                split={false}
                dataSource={[]}
                locale={{
                  emptyText: '还没有好心老板'
                }}
                renderItem={item => null}
              />
            </Content>
          </Col>
          <Col lg={6} md={7} xs={24}>
            <RightSide />
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
})
