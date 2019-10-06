import Link from 'next/link'
import styled from 'styled-components'
import { Divider, Layout } from 'antd'
import Container from './Container'

const StyledContainer = styled(Container)`
  padding: 24px 0;
  color: #8c8c8c;
  text-align: center;
  font-size: 12px;
  a {
    color: #8c8c8c;
    &:hover {
      color: #262626;
    }
  }
`

const { Footer } = Layout

export default props => {
  return (
    <Footer>
      <StyledContainer {...props}>
        <Link href='/'>
          <a>首页</a>
        </Link>
        <Divider type='vertical' />
        {process.env.SLOGAN} <span style={{ display: 'none' }}>v{process.env.VERSION}</span>
      </StyledContainer>
    </Footer>
  )
}
