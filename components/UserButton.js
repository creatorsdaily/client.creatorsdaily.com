import Link from 'next/link'
import styled from 'styled-components'
import { Button, Menu, Popover } from 'antd'
import { useRouter } from 'next/router'
import UserOutlined from '@ant-design/icons/UserOutlined'
import SettingOutlined from '@ant-design/icons/SettingOutlined'
import LogoutOutlined from '@ant-design/icons/LogoutOutlined'
import FileTextOutlined from '@ant-design/icons/FileTextOutlined'
import AppstoreOutlined from '@ant-design/icons/AppstoreOutlined'
import HomeOutlined from '@ant-design/icons/HomeOutlined'
import UserCell from './UserCell'

const StyledButton = styled(Button)`
padding: 0;
border: 0;
div {
  letter-spacing: 0 !important;
}
`

const UserButton = ({ user, back = '/', ...rest }) => {
  const router = useRouter()
  if (!user) {
    return (
      <div {...rest}>
        <Link href={`/auth?back=${encodeURIComponent(back)}`} passHref>
          <a>
            <Button type='dashed' icon={<UserOutlined />}>注册 或 登录</Button>
          </a>
        </Link>
      </div>
    )
  }
  const menu = (
    <Menu selectedKeys={[router.pathname]}>
      <Menu.Item key='/home'>
        <Link href='/home'>
          <a>
            <HomeOutlined />
            个人中心
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key='/home/products'>
        <Link href='/home/products'>
          <a>
            <AppstoreOutlined />
            我的产品
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key='/home/posts'>
        <Link href='/home/posts'>
          <a>
            <FileTextOutlined />
            我的文章
          </a>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='/users/[id]'>
        <Link href={`/users/${user.id}`}>
          <a>
            <UserOutlined />
            我的主页
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key='/settings/profile'>
        <Link href='/settings/profile'>
          <a>
            <SettingOutlined />
            设置
          </a>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='signout'>
        <Link href={`/auth/signout?back=${encodeURIComponent(back)}`}>
          <a>
            <LogoutOutlined />
            退出账号
          </a>
        </Link>
      </Menu.Item>
    </Menu>
  )
  return (
    <Popover content={menu} overlayClassName='user-button-popover'>
      <div {...rest}>
        <StyledButton {...rest}>
          <UserCell user={user} hideName />
        </StyledButton>
      </div>
    </Popover>
  )
}
export default UserButton
