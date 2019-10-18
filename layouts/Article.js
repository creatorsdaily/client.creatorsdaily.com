import styled from 'styled-components'
import { Col, Row } from 'antd'
import Container from '../components/Container'
import Article from '../components/Article'
import media from '../libs/media'
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
        <Row type='flex' justify='center' gutter={24}>
          <Col xl={14} lg={16} md={20} xs={24}>
            <StyledArticle>
              {children}
            </StyledArticle>
            {footer}
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
}
