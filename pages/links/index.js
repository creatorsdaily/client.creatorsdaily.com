import React from 'react'
import Head from 'next/head'
import { Col, Row, Spin, Typography } from 'antd'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import Page from '../../layouts/Page'
import Container from '../../components/Container'
import RightSide from '../../components/RightSide'
import { GET_LINKS } from '../../queries'
import Box from '../../components/Box'
import IPFSImage from '../../components/IPFSImage'
import media from '../../libs/media'
import withApollo from '../../libs/with-apollo'

const StyledContainer = styled(Container)`
margin: 24px auto;
`

const LinkTitle = styled.div`
line-height: 30px;
height: 30px;
text-align: center;
color: #333;
margin: 0 8px 16px;
font-weight: bold;
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
`

const StyledIPFSImage = styled(IPFSImage)`
  width: 50px;
  height: 50px;
  margin: 16px auto 8px;
  display: block;
  object-fit: contain;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 12px;
`

const LinkContent = styled.div`
padding: 0 24px;
margin-bottom: 24px;
${media.sm`
  padding: 0;
`}
`

const StyledBox = styled(Box)`
margin-bottom: 24px;
`

export default withApollo(() => {
  const { data, loading } = useQuery(GET_LINKS)
  const links = get(data, 'getLinks.data', [])
  return (
    <Page>
      <Head>
        <title>友情链接 - {process.env.NAME}</title>
      </Head>
      <StyledContainer>
        <Row gutter={24}>
          <Col lg={18} md={17} xs={24}>
            <LinkContent>
              <Typography.Title level={4}>友情链接</Typography.Title>
              如果你有自己的<Typography.Text type='danger'>网站</Typography.Text>或者<Typography.Text type='danger'>博客</Typography.Text>，非常欢迎你可以和创造者日报交换友情链接，请右侧添加微信详细沟通。
            </LinkContent>
            <Spin spinning={loading}>
              <Row gutter={24}>
                {links.map(x => (
                  <Col key={x.id} xl={4} lg={6} md={8} sm={6} xs={24}>
                    <a target='_blank' rel='noopener noreferrer' href={x.url} alt={x.name}>
                      <StyledBox>
                        <StyledIPFSImage hash={x.media && x.media.hash} />
                        <LinkTitle>
                          {x.name}
                        </LinkTitle>
                      </StyledBox>
                    </a>
                  </Col>
                ))}
              </Row>
            </Spin>
          </Col>
          <Col lg={6} md={7} xs={24}>
            <RightSide />
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
})
