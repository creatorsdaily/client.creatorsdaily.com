import React from 'react'
import Head from 'next/head'
import { Col, Menu, Row } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Page from '../layouts/Page'
import Container from '../components/Container'
import SmallTitle from '../components/SmallTitle'

const StyledContainer = styled(Container)`
margin: 24px auto;
`

const FormContainer = styled.div`
background: #FFF;
padding: 24px;
border-radius: 3px;
`

const MenuContainer = styled.div`
margin-bottom: 24px;
background: #FFF;
overflow: hidden;
border-radius: 3px;
`

const StyledTitle = styled(SmallTitle)`
margin-left: 24px;
margin-top: 12px;
`

const StyledMenu = styled(Menu)`
border-right: 0;
.ant-menu-item-selected:after {
  display: none;
}
`

const Setting = ({ children }) => {
  const { pathname } = useRouter()
  return (
    <Page>
      <Head>
        <title>设置 - {process.env.NEXT_PUBLIC_NAME}</title>
      </Head>
      <StyledContainer>
        <Row gutter={24}>
          <Col xl={4} lg={5} md={6} sm={24}>
            <MenuContainer>
              <StyledTitle>设置</StyledTitle>
              <StyledMenu selectedKeys={[pathname]} mode='inline'>
                <Menu.Item key='/settings/profile'>
                  <Link href='/settings/profile'>
                    <a>个人信息</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key='/settings/mobile'>
                  <Link href='/settings/mobile'>
                    <a>绑定手机号</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key='/settings/wechat'>
                  <Link href='/settings/wechat'>
                    <a>绑定微信</a>
                  </Link>
                </Menu.Item>
                <Menu.Item disabled key='password'>修改密码</Menu.Item>
              </StyledMenu>
            </MenuContainer>
          </Col>
          <Col xl={12} lg={14} md={18} sm={24}>
            <FormContainer>
              {children}
            </FormContainer>
          </Col>
          <Col xl={8} lg={5} md={24} sm={24} />
        </Row>
      </StyledContainer>
    </Page>
  )
}
export default Setting
