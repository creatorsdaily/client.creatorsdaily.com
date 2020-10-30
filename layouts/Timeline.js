import React from 'react'
import Head from 'next/head'
import { Affix, Col, Menu, Row } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Page from '../layouts/Page'
import Container from '../components/Container'
import useViewer from '../hooks/useViewer'

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
  const { viewer } = useViewer()
  return (
    <Page>
      <Head>
        <title>动态 - {process.env.NAME}</title>
      </Head>
      <StyledContainer>
        <Row gutter={24}>
          <Col xl={4} lg={5} md={6} sm={24}>
            <Affix offsetTop={24}>
              <MenuContainer>
                <StyledMenu selectedKeys={[pathname]} mode='inline'>
                  {viewer && (
                    <Menu.Item key='/timeline'>
                      <Link href='/timeline'>
                        <a>关注</a>
                      </Link>
                    </Menu.Item>
                  )}
                  <Menu.Item key='/timeline/public'>
                    <Link href='/timeline/public'>
                      <a>发现</a>
                    </Link>
                  </Menu.Item>
                </StyledMenu>
              </MenuContainer>
            </Affix>
          </Col>
          <Col xl={12} lg={14} md={18} sm={24}>
            {children}
          </Col>
          <Col xl={8} lg={5} md={24} sm={24} />
        </Row>
      </StyledContainer>
    </Page>
  )
}
export default Timeline
