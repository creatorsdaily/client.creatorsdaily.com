import { Col, Layout, Menu, Row } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import media from '../libs/media'
import useViewer from '../hooks/useViewer'
import Container from './Container'
import UserButton from './UserButton'
import Brand from './Brand'

const { Header } = Layout

const menu = [{
  name: '首页',
  href: '/'
}, {
  name: '日报',
  href: '/posts'
}, {
  name: '创造者们',
  href: '/creators',
  disabled: true
}, {
  name: '关于',
  href: '/about'
}]

const Logo = styled.div`
  color: #262626;
  font-size: 18px;
  padding: 0 12px;
  ${media.sm`
    padding: 0;
  `}
`

export default withRouter(({ router }) => {
  const { viewer: user } = useViewer()
  const matched = menu.filter(({ href }) => router.asPath.indexOf(href) === 0).map(x => x.href)
  return (
    <Header>
      <Container>
        <Row type='flex' align='middle'>
          <Col lg={5} md={5} sm={2} xs={4}>
            <Link href='/' passHref>
              <a>
                <Logo>
                  <Brand name={process.env.NAME} />
                </Logo>
              </a>
            </Link>
          </Col>
          <Col xl={15} lg={14} md={13} sm={13} xs={20}>
            <Menu
              mode='horizontal'
              selectedKeys={matched}
            >
              {menu.map(({ href, name, disabled }) => (
                <Menu.Item key={href} disabled={disabled}>
                  <Link href={href}>
                    <a>
                      {name}
                    </a>
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </Col>
          <Col xl={4} lg={5} md={6} sm={9} xs={0}>
            <UserButton user={user} back={router.asPath} style={{ float: 'right' }} />
          </Col>
        </Row>
      </Container>
    </Header>
  )
})
