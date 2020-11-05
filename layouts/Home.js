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
padding: 32px 0;
`

const StyledMenu = styled(Menu)`
border-right: 0;
.ant-menu-item-selected:after {
  display: none;
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
                  <Menu.Item key='/'>
                    <Link href='/'>
                      <a>产品</a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key='/timeline'>
                    <Link href='/timeline'>
                      <a>动态</a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key='/discussions'>
                    <Link href='/discussions'>
                      <a>讨论</a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key='/timeline/public'>
                    <Link href='/timeline/public'>
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
