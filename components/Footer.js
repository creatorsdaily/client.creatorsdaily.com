import Link from 'next/link'
import styled from 'styled-components'
import { Affix, Col, Divider, Layout, Row } from 'antd'
import media from '../libs/media'
import Container from './Container'
import FooterButtons from './FooterButtons'

const StyledFooter = styled(Layout.Footer)`
padding: 24px 0;
`

const StyledContainer = styled(Container)`
color: #6C6C6C;
font-size: 12px;
a {
  color: #6C6C6C;
  &:hover {
    color: #262626;
  }
}
`

const Content = styled.div`
line-height: 32px;
text-align: center;
${media.sm`
  text-align: left;
`}
`

const Bottom = styled(Row)`
padding: 24px 0;
`

const Footer = props => {
  return (
    <StyledFooter>
      <StyledContainer {...props}>
        <Row type='flex' gutter={24} justify='center' align='middle'>
          <Col md={14} sm={24} xs={24}>
            <Content>
              <a href='http://www.beian.miit.gov.cn' target='_blank' rel='noopener noreferrer'>冀ICP备20003217号</a>
              <Divider type='vertical' />
              <a href='/api/atom' rel='noreferrer' target='_blank'>ATOM</a>
              <Divider type='vertical' />
              <a href='/api/rss' rel='noreferrer' target='_blank'>RSS</a>
              <Divider type='vertical' />
              <Link href='/links'>
                <a>友情链接</a>
              </Link>
              <Divider type='vertical' />
              <Link href='/likes'>
                <a>喜欢</a>
              </Link>
            </Content>
          </Col>
          <Col md={10} sm={0} xs={0} />
        </Row>
      </StyledContainer>
      <Divider />
      <StyledContainer>
        <Bottom type='flex' gutter={24} justify='center' align='middle'>
          <Col md={14} sm={24} xs={24}>
            <Content>
              <Link href='/'>
                <a>{process.env.NEXT_PUBLIC_NAME}</a>
              </Link>
              <span style={{ padding: '0 8px' }}>-</span>
              {process.env.NEXT_PUBLIC_SLOGAN} <span style={{ display: 'none' }}>v{process.env.VERSION}</span>
              <Divider type='vertical' />
              <Link href='/about'>
                <a>关于</a>
              </Link>
              <Divider type='vertical' />
              <a href='mailto:tengfei@creatorsdaily.com'>联系我们</a>
            </Content>
          </Col>
          <Col md={10} sm={0} xs={0}>
            <div style={{ justifyContent: 'flex-end', display: 'flex' }}>
              <Affix offsetBottom={48}>
                <FooterButtons />
              </Affix>
            </div>
          </Col>
        </Bottom>
      </StyledContainer>
    </StyledFooter>
  )
}
export default Footer
