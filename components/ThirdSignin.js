import styled from 'styled-components'
import { Col, Icon, Row } from 'antd'
import Link from 'next/link'

const Container = styled.div`
  position: relative;
  margin-top: 24px;
  border-top: 1px solid #e8e8e8;
  padding-top: 24px;
`

const StyledIcon = styled(Icon)`
  margin-right: 5px;
  font-size: 14px;
`

export default ({
  href = '/auth/signup',
  text = '快速注册',
  back = '/'
}) => {
  return (
    <Container>
      <Row type='flex'>
        <Col span={18}>
          <Link href={`/auth/github?back=${back}`}>
            <a>
              <StyledIcon type='github' />
              Github
            </a>
          </Link>
        </Col>
        <Col span={5} offset={1}>
          <Link href={href}><a>{text}</a></Link>
        </Col>
      </Row>
    </Container>
  )
}
