import React from 'react'
import Head from 'next/head'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import get from 'lodash/get'
import { Avatar, Divider } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import withApollo from '../../libs/with-apollo'
import Setting from '../../layouts/Setting'
import { VIEWER_AUTHES } from '../../queries'
import WXACode from '../../components/WXACode'
import useAuth from '../../hooks/useAuth'

const isBrowser = typeof window !== 'undefined'

const MINI_PROGRAM_BINDED = gql`
  subscription miniProgramBinded {
    miniProgramBinded {
      data
    }
  }
`

const UserCell = styled.div`
display: flex;
height: 32px;
align-items: center;
`

const UserName = styled.div`
margin-left: 12px;
font-size: 14px;
font-weight: bold;
`

const Info = styled.div`
margin-bottom: 24px;
font-size: 14px;
`

const StyledWXACode = styled(WXACode)`
width: 256px;
height: 256px;
margin: 0 auto;
display: block;
`

export default withApollo(() => {
  useAuth()
  const { data } = useQuery(VIEWER_AUTHES)
  const { data: binded } = useSubscription(MINI_PROGRAM_BINDED, {
    skip: !isBrowser
  })
  const profile = JSON.parse(get(binded, 'miniProgramBinded.data', 'null'))
  const miniProgramProfile = JSON.parse(get(get(data, 'viewer.authes', []).find(x => x.type === 'miniprogram'), 'data', 'null'))
  const renderUserCell = () => {
    const user = miniProgramProfile || profile
    if (!user) return null
    return (
      <div>
        <Info>当前账号已绑定以下微信账号</Info>
        <UserCell>
          <Avatar shape='square' size={32} icon={<UserOutlined />} src={user.avatarUrl} />
          <UserName>{user.nickName}</UserName>
        </UserCell>
      </div>
    )
  }
  const renderQrCode = () => {
    const user = miniProgramProfile || profile
    if (user) return null
    return (
      <div>
        <Info>
          打开微信扫一扫，立刻绑定微信账号，实现快速登录。
        </Info>
        <Divider />
        <StyledWXACode />
      </div>
    )
  }
  return (
    <Setting>
      <Head>
        <title>绑定微信 - {process.env.NAME}</title>
      </Head>
      {renderQrCode()}
      {renderUserCell()}
    </Setting>
  )
})
