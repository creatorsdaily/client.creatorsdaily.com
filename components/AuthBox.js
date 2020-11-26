import styled from 'styled-components'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useViewer from '../hooks/useViewer'
import media from '../libs/media'
import redirect from '../libs/redirect'
import ThirdSignin from './ThirdSignin'

const Container = styled.div`
  padding-top: 96px;
  width: 100%;
  margin: 0 auto 60px;
  min-height: 556px;
  box-sizing: border-box;
  ${media.sm`
    width: 360px;
  `}
`

const Box = styled.div`
  background-color: #fff;
  padding: 40px 8px 48px;
  margin-bottom: 64px;
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
  ${media.sm`
    width: 360px;
    border-radius: 4px;
    border: 1px solid #e9e9e9;
  `}
`

const Content = styled.div`
  max-width: 250px;
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
  margin-bottom: 32px;
  font-size: 18px;
`

const Body = styled.div`
  margin-top: 16px;
`

const AuthBox = ({ children }) => {
  const { query } = useRouter()
  const back = query.back || '/'
  const { viewer, loading } = useViewer()
  useEffect(() => {
    if (viewer) {
      redirect(back)
    }
  }, [loading])
  return (
    <Container>
      <Box>
        <Content>
          <Header>
            <Title>{process.env.NEXT_PUBLIC_NAME}</Title>
            <Slogon>{process.env.NEXT_PUBLIC_SLOGAN}</Slogon>
          </Header>
          <Body>
            {children}
            <ThirdSignin back={back} />
          </Body>
        </Content>
      </Box>
    </Container>
  )
}
export default AuthBox
