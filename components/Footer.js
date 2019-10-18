import Link from 'next/link'
import styled from 'styled-components'
import { Affix, Col, Divider, Layout, Row } from 'antd'
import Container from './Container'
import FooterButtons from './FooterButtons'

const StyledContainer = styled(Container)`
  padding: 24px 0;
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
  height: 32px;
  line-height: 32px;
`

const { Footer } = Layout

export default props => {
  return (
    <Footer>
      <StyledContainer {...props}>
        <Row type='flex' gutter={24} justify='center'>
          <Col md={14} sm={24} xs={24}>
            <Content>
              <Link href='/'>
                <a>{process.env.NAME}</a>
              </Link>
              <Divider type='vertical' />
              {process.env.SLOGAN} <span style={{ display: 'none' }}>v{process.env.VERSION}</span>
            </Content>
          </Col>
          <Col md={10} sm={0} xs={0}>
            <div style={{ justifyContent: 'flex-end', display: 'flex' }}>
              <Affix offsetBottom={48}>
                <FooterButtons />
              </Affix>
            </div>
          </Col>
        </Row>
      </StyledContainer>
    </Footer>
  )
}
