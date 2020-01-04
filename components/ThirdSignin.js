import styled from 'styled-components'
import { Button, Divider } from 'antd'
import Link from 'next/link'

const Container = styled.div`
  position: relative;
`

export default ({
  back = '/'
}) => {
  return (
    <Container>
      <Divider>更多登录方式</Divider>
      <Link href={`/auth/github?back=${back}`}>
        <a>
          <Button icon='github' block>GitHub 快速登录</Button>
        </a>
      </Link>
    </Container>
  )
}
