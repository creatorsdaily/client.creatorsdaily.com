import Head from 'next/head'
import styled from 'styled-components'
import { Col, Row, Typography } from 'antd'
import Page from '../layouts/Page'
import Container from '../components/Container'
import MilestoneList from '../components/MilestoneList'
import media from '../libs/media'
import withApollo from '../libs/with-apollo'
import RightSide from '../components/RightSide'

const StyledContainer = styled(Container)`
  margin-top: 24px;
  margin-bottom: 24px;
`

const Content = styled.div`
padding: 0 24px;
margin-bottom: 24px;
${media.sm`
  padding: 0;
`}
`

export default withApollo(() => {
  return (
    <Page>
      <Head>
        <title>里程碑 - {process.env.NAME}</title>
      </Head>
      <StyledContainer>
        <Row type='flex' gutter={24}>
          <Col lg={18} md={16} xs={24}>
            <Content>
              <Typography.Title level={4}>里程碑</Typography.Title>
              产品新动态
            </Content>
            <MilestoneList />
          </Col>
          <Col lg={6} md={8} xs={24}>
            <RightSide />
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
})
