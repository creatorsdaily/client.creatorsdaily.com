import styled from 'styled-components'
import { Button, Divider, Modal, Space } from 'antd'
import Link from 'next/link'
import GithubOutlined from '@ant-design/icons/GithubOutlined'
import WechatOutlined from '@ant-design/icons/WechatOutlined'
import { useToggle } from 'react-use'
import { v4 } from 'slugid'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import media from '../libs/media'
import WechatBox from './WechatBox'

const Container = styled.div`
position: relative;
margin-top: 48px;
`
const StyledWechatBox = styled(WechatBox)`
display: none;
${media.sm`
display: block;
`}
`

const ThirdSignin = ({
  back = '/'
}) => {
  const [visible, setVisible] = useToggle(false)
  const [code, setCode] = useState(v4())
  const { pathname } = useRouter()
  useEffect(() => {
    const timer = setInterval(() => setCode(v4()), 2 * 60 * 1000)
    return () => clearInterval(timer)
  }, [])
  const renderElse = () => {
    if (pathname === '/auth') {
      return (
        <Link href={`/auth/signin?back=${back}`}>
          <a>
            <Button block type='link' size='small' style={{ fontSize: 12 }}>原账号密码登录</Button>
          </a>
        </Link>
      )
    } else {
      return (
        <Link href={`/auth?back=${back}`}>
          <a>
            <Button block type='link' size='small' style={{ fontSize: 12 }}>手机号登录注册</Button>
          </a>
        </Link>
      )
    }
  }
  return (
    <Container>
      <Divider>更多登录方式</Divider>
      <Space direction='vertical' size='middle' style={{ width: '100%' }}>
        <Button icon={<WechatOutlined />} block onClick={() => setVisible(true)}>微信小程序 快速登录</Button>
        <Link href={`/auth/github?back=${back}`}>
          <a>
            <Button icon={<GithubOutlined />} block>GitHub 快速登录</Button>
          </a>
        </Link>
        {renderElse()}
      </Space>
      <Modal
        width={400}
        title='微信小程序快速登录'
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <StyledWechatBox code={code} back={back} />
      </Modal>
    </Container>
  )
}
export default ThirdSignin
