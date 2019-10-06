import styled from 'styled-components'
import media from '../libs/media'

const Container = styled.div`
  padding-top: 96px;
  width: 100%;
  margin: 0 auto 60px;
  min-height: 556px;
  box-sizing: border-box;
  ${media.sm`
    width: 430px;
  `}
`

const AuthBox = styled.div`
  background-color: #fff;
  padding: 40px 8px 48px;
  margin-bottom: 64px;
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
  ${media.sm`
    width: 430px;
    border-radius: 4px;
    border: 1px solid #e9e9e9;
  `}
`

const Content = styled.div`
  max-width: 320px;
  margin: 0 auto;
  border-radius: 4px;
  font-size: 14px;
`

const Header = styled.div`
  text-align: center;
`

const Title = styled.h2`
  font-size: 32px;
  line-height: 1.2;
  color: #262626;
`

const Slogon = styled.p`
  color: #595959;
  margin-top: 8px;
  font-size: 18px;
`

const Body = styled.div`
  margin-top: 32px;
`

export default ({ children }) => {
  return (
    <Container>
      <AuthBox>
        <Content>
          <Header>
            <Title>{process.env.NAME}</Title>
            <Slogon>{process.env.SLOGAN}</Slogon>
          </Header>
          <Body>
            {children}
          </Body>
        </Content>
      </AuthBox>
    </Container>
  )
}
