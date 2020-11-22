import Head from 'next/head'
import styled from 'styled-components'
import { Col, Row } from 'antd'
import Page from '../layouts/Page'
import Container from '../components/Container'
import MilestoneList from '../components/MilestoneList'
import media from '../libs/media'
import withApollo from '../libs/with-apollo'
import RightSide from '../components/RightSide'
import LeftSide from '../components/LeftSide'

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
          <Col
            xl={{
              order: 1,
              span: 14
            }} lg={18} md={16} xs={24}
          >
            <Content>
              <h1>里程碑</h1>
              产品新动态
            </Content>
            <MilestoneList />
          </Col>
          <Col xl={4} md={0} xs={24}>
            <LeftSide />
          </Col>
          <Col xl={{ order: 2 }} lg={6} md={8} xs={24}>
            <RightSide />
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
})
