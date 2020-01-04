import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { v4 } from 'slugid'
import { useRouter } from 'next/router'
import useViewer from '../hooks/useViewer'
import media from '../libs/media'
import redirect from '../libs/redirect'
import WechatBox from './WechatBox'
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

const AuthBox = styled.div`
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
  font-size: 18px;
`

const Body = styled.div`
  margin-top: 16px;
`

const StyledWechatBox = styled(WechatBox)`
display: none;
${media.sm`
display: block;
`}
`

export default ({ children }) => {
  const [code, setCode] = useState(v4())
  useEffect(() => {
    const timer = setInterval(() => setCode(v4()), 2 * 60 * 1000)
    return () => clearInterval(timer)
  }, [])
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
      <AuthBox>
        <Content>
          <Header>
            <Title>{process.env.NAME}</Title>
            <Slogon>{process.env.SLOGAN}</Slogon>
            <StyledWechatBox code={code} back={back} />
          </Header>
          <Body>
            {children}
            <ThirdSignin back={back} />
          </Body>
        </Content>
      </AuthBox>
    </Container>
  )
}
