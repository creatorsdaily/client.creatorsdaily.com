import Head from 'next/head'
import styled from 'styled-components'
import { Col, Row } from 'antd'
import Page from '../layouts/Page'
import withApollo from '../libs/with-apollo'
import Container from '../components/Container'
import AppStore from '../components/icons/AppStore.white.svg'
import media from '../libs/media'

const StyledPage = styled(Page)`
background-color: #FFF;
`

const Title = styled.h1`
margin-top: 80px;
font-size: 30px;
text-align: center;
${media.md`
  text-align: left;
`}
`

const Subtitle = styled.h2`
font-size: 20px;
color: #404040;
font-weight: normal;
margin-bottom: 48px;
text-align: center;
${media.md`
  text-align: left;
`}
`

const Content = styled.p`
margin-bottom: 72px;
font-weight: bold;
font-size: 14px;
text-align: center;
${media.md`
  text-align: left;
`}
`

const Qrcode = styled.img`
width: 100%;
height: 100%;
max-width: 200px;
display: block;
margin: 24px auto;
${media.md`
  margin: 0;
`}
`

const StyledAppStore = styled(AppStore)`
width: 160px;
height: auto;
display: block;
margin: 0 auto 0;
${media.md`
  margin: 0;
`}
`

const Android = styled.p`
font-size: 12px;
width: 160px;
text-align: center;
margin: 24px auto 0;
${media.md`
  margin: 24px 0 0;
`}
`

const StyledContainer = styled(Container)`
padding: 0 16px;
${media.md`
  padding: 0;
`}
`

const AppContainer = styled.div`
position: relative;
width: 320px;
margin: 40px auto 0;
min-height: 680px;
`

const AppMasker = styled.img`
position: absolute;
width: 100%;
`

const AppImage = styled.img`
position: absolute;
width: 83.4%;
margin-left: 8.3%;
margin-top: 6.4%;
`

export default withApollo(() => {
  return (
    <StyledPage>
      <Head>
        <title>APP - {process.env.NEXT_PUBLIC_NAME}</title>
        <meta key='description' name='description' content='创造者日报APP' />
      </Head>
      <StyledContainer>
        <Row>
          <Col xl={10} lg={11} md={12} xs={24}>
            <Title>创造者日报</Title>
            <Subtitle>每天发现有趣的产品！</Subtitle>
            <Content>创造者日报是一个爱意满满的创造者作品展示平台，你可以在这里分享、发现有趣且有爱的产品，还可以结识新的朋友，赶快下载体验吧！</Content>
            <Row align='middle'>
              <Col md={16} xs={24}>
                <a href='https://testflight.apple.com/join/eh1xMlb8' target='_blank' rel='noreferrer'>
                  {/* <a href='https://apps.apple.com/cn/app/id1517824086' target='_blank' rel='noreferrer'> */}
                  <StyledAppStore />
                </a>
                <Android>Android 版本敬请期待</Android>
              </Col>
              <Col md={8} xs={24}>
                <Qrcode src='/qrcode-app.png' />
              </Col>
            </Row>
          </Col>
          <Col xl={14} lg={13} md={12} xs={24}>
            <AppContainer>
              <AppImage src='/app.png' />
              <AppMasker src='/iPhone XS.png' />
            </AppContainer>
          </Col>
        </Row>
      </StyledContainer>
    </StyledPage>
  )
})
