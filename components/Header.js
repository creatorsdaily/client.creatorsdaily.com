import { Button, Col, Layout, Menu, Row, Tooltip } from 'antd'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import Link from 'next/link'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import media from '../libs/media'
import useViewer from '../hooks/useViewer'
import Container from './Container'
import UserButton from './UserButton'
import Brand from './Brand'
import Search from './Search'

const StyledContainer = styled(Container)`
.ant-menu-item {
padding: 0 15px;
}
`

const CreateButton = styled.a`
display: flex;
justify-content: flex-end;
margin-right: 12px;
svg {
  color: rgba(0,0,0,0.7);
}
`

const StyledUserButton = styled(UserButton)`
line-height: initial;
box-shadow: none;
`

const UserContainer = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
`

const HeaderContent = styled.div`
display: flex;
align-items: center;
`

const StyledSearch = styled(Search)`
margin: 0 24px;
`

const { Header } = Layout

const menu = [{
  name: '创造者们',
  href: '/creators'
}, {
  name: '日报',
  href: '/posts'
}/*, {
  name: '聊产品',
  href: '/talk'
}, {
  name: '里程碑',
  href: '/milestones'
}, {
  name: 'APP',
  href: '/app',
  disabled: true
} */]

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
  const matched = menu
    .filter(({ href }) => href === '/' ? router.asPath === '/' : router.asPath.indexOf(href) === 0)
    .map(x => x.href)
  const renderCreateButton = () => {
    if (!user) return null
    return (
      <Link href='/create' passHref>
        <CreateButton>
          <Tooltip title='发布产品'>
            <Button type='link' icon={<PlusOutlined />} size='large' />
          </Tooltip>
        </CreateButton>
      </Link>
    )
  }
  return (
    <Header>
      <StyledContainer>
        <Row type='flex' align='middle'>
          <Col xl={4} lg={5} md={5} sm={2} xs={4}>
            <Link href='/' passHref>
              <a>
                <Logo>
                  <Brand name={process.env.NAME} />
                </Logo>
              </a>
            </Link>
          </Col>
          <Col xl={16} lg={14} md={13} sm={14} xs={20}>
            <HeaderContent>
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
              <StyledSearch />
            </HeaderContent>
          </Col>
          <Col xl={4} lg={5} md={6} sm={8} xs={0}>
            <UserContainer>
              {renderCreateButton()}
              <StyledUserButton user={user} back={router.asPath} />
            </UserContainer>
          </Col>
        </Row>
      </StyledContainer>
    </Header>
  )
})
