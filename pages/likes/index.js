import React from 'react'
import Head from 'next/head'
import { Col, Row, Typography } from 'antd'
import styled from 'styled-components'
import Page from '../../layouts/Page'
import Container from '../../components/Container'
import RightSide from '../../components/RightSide'
import media from '../../libs/media'
import withApollo from '../../libs/with-apollo'

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

const StyledImage = styled.img`
width: 80%;
margin: 24px auto;
display: block;
`

export default withApollo(() => {
  return (
    <Page>
      <Head>
        <title>喜欢 - {process.env.NAME}</title>
      </Head>
      <StyledContainer>
        <Row gutter={24}>
          <Col lg={18} md={17} xs={24}>
            <LikeContent>
              <Typography.Title level={4}>喜欢</Typography.Title>
              如果你真的<Typography.Text type='danger'>抑制不住</Typography.Text>地喜欢我，那么非常欢迎你的赞赏，让你的喜欢来得更猛烈些吧！
            </LikeContent>
            <Row gutter={24} type='flex' align='middle'>
              <Col md={8} xs={24}>
                <StyledImage src='/zanshang.jpg' />
              </Col>
              <Col md={8} xs={24}>
                <StyledImage src='/wepay.jpg' />
              </Col>
              <Col md={8} xs={24}>
                <StyledImage src='/alipay.jpg' />
              </Col>
            </Row>
          </Col>
          <Col lg={6} md={7} xs={24}>
            <RightSide />
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
})
