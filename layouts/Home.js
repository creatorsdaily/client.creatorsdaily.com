import React from 'react'
import Head from 'next/head'
import { Affix, Col, Menu, Row } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Container from '../components/Container'
import useAuth from '../hooks/useAuth'
import Page from './Page'

const StyledContainer = styled(Container)`
margin: 24px auto;
`

const MenuContainer = styled.div`
margin-bottom: 24px;
background: #FFF;
overflow: hidden;
border-radius: 3px;
padding: 12px 0;
`

const StyledMenu = styled(Menu)`
border-right: 0;
.ant-menu-item-selected:after {
  display: none;
}
.ant-menu-item-divider {
  margin-top: 12px;
  margin-bottom: 12px;
}
`

const Timeline = ({ children }) => {
  const { pathname } = useRouter()
  useAuth()
  return (
    <Page>
      <Head>
        <title>个人中心 - {process.env.NAME}</title>
      </Head>
      <StyledContainer>
        <Row gutter={24}>
          <Col xl={4} lg={5} md={6} sm={24}>
            <Affix offsetTop={24}>
              <MenuContainer>
                <StyledMenu selectedKeys={[pathname]} mode='inline'>
                  <Menu.Item key='/home'>
                    <Link href='/home'>
                      <a>动态</a>
                    </Link>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key='/home/products'>
                    <Link href='/home/products'>
                      <a>我的产品</a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key='/home/posts'>
                    <Link href='/home/posts'>
                      <a>我的文章</a>
                    </Link>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key='/home/explore'>
                    <Link href='/home/explore'>
                      <a>发现</a>
                    </Link>
                  </Menu.Item>
                </StyledMenu>
              </MenuContainer>
            </Affix>
          </Col>
          <Col xl={20} lg={19} md={18} sm={24}>{children}</Col>
        </Row>
      </StyledContainer>
    </Page>
  )
}
export default Timeline
