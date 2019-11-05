import styled from 'styled-components'
import { Col, Row } from 'antd'
import Container from '../components/Container'
import Article from '../components/Article'
import media from '../libs/media'
import RightSide from '../components/RightSide'
import Page from './Page'

const StyledContainer = styled(Container)`
margin: 24px auto;
`

const StyledArticle = styled(Article)`
background: #FFF;
padding: 24px;
${media.sm`
  padding: 24px 32px;
`}
`

export default ({ children, footer = null }) => {
  if (typeof footer === 'function') {
    footer = footer()
  }
  return (
    <Page>
      <StyledContainer>
        <Row type='flex' gutter={24}>
          <Col lg={14} md={17} xs={24}>
            <StyledArticle>
              {children}
            </StyledArticle>
            {footer}
          </Col>
          <Col lg={6} md={7} xs={24}>
            <RightSide />
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
}
