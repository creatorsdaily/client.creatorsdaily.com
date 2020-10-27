import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { v4 } from 'slugid'
import { useRouter } from 'next/router'
import { Button, Divider } from 'antd'
import Link from 'next/link'
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

const ElseButton = styled(Button)`
margin-top: 8px;
`

const AuthBox = ({ children }) => {
  const [code, setCode] = useState(v4())
  useEffect(() => {
    const timer = setInterval(() => setCode(v4()), 2 * 60 * 1000)
    return () => clearInterval(timer)
  }, [])
  const { query, pathname } = useRouter()
  const back = query.back || '/'
  const { viewer, loading } = useViewer()
  useEffect(() => {
    if (viewer) {
      redirect(back)
    }
  }, [loading])
  const renderElse = () => {
    if (pathname === '/auth/signin') {
      return (
        <>
          <Divider>或者</Divider>
          <Link href={`/auth/signup?back=${encodeURIComponent(back)}`}>
            <a>
              <ElseButton block type='dashed'>立刻注册账号</ElseButton>
            </a>
          </Link>
        </>
      )
    } else if (pathname === '/auth/signup') {
      return (
        <>
          <Divider>或者</Divider>
          <Link href={`/auth/signin?back=${encodeURIComponent(back)}`}>
            <a>
              <ElseButton block type='dashed'>直接登录</ElseButton>
            </a>
          </Link>
        </>
      )
    }
  }
  return (
    <Container>
      <Box>
        <Content>
          <Header>
            <Title>{process.env.NAME}</Title>
            <Slogon>{process.env.SLOGAN}</Slogon>
            <StyledWechatBox code={code} back={back} />
          </Header>
          <Body>
            {children}
            {renderElse()}
            <ThirdSignin back={back} />
          </Body>
        </Content>
      </Box>
    </Container>
  )
}
export default AuthBox
