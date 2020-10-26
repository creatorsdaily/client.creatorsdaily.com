import { Affix, Button, Col, Row } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import media from '../libs/media'
import useViewer from '../hooks/useViewer'
import Box from './Box'

const StyledBox = styled(Box)`
padding: 24px;
display: block;
margin-bottom: 24px;
${media.sm`
  display: none;
`}
`

const MobileAuthBar = () => {
  const { asPath } = useRouter()
  const { viewer, loading } = useViewer()
  const back = encodeURIComponent(asPath)
  if (loading || viewer) return null
  return (
    <Affix offsetBottom={0}>
      <StyledBox>
        <Row type='flex' gutter={24}>
          <Col span={16}>
            <Link href={`/auth/signup?back=${back}`}>
              <a>
                <Button block type='primary'>快速注册</Button>
              </a>
            </Link>
          </Col>
          <Col span={8}>
            <Link href={`/auth/signin?back=${back}`}>
              <a>
                <Button block>登录</Button>
              </a>
            </Link>
          </Col>
        </Row>
      </StyledBox>
    </Affix>
  )
}
export default MobileAuthBar
