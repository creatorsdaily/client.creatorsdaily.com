import React from 'react'
import Head from 'next/head'
import { Affix, Col, Menu, Row, Spin } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import { useQuery } from '@apollo/client'
import Page from '../layouts/Page'
import Container from '../components/Container'
import useViewer from '../hooks/useViewer'
import UserList from '../queries/UserList.gql'
import UserCell from '../components/UserCell'
import Box from '../components/Box'
import SmallTitle from '../components/SmallTitle'

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

const StyledBox = styled(Box)`
padding: 16px;
`

const StyledUserCell = styled(UserCell)`
margin-top: 16px;
`
const Timeline = ({ children }) => {
  const { pathname } = useRouter()
  const { viewer } = useViewer()
  const { data, loading } = useQuery(UserList, {
    variables: {
      size: 8,
      isCreator: true
    }
  })
  const users = get(data, 'getUsers.data', [])

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
          <Col xl={8} lg={5} md={24} sm={24}>
            <Affix offsetTop={24}>
              <StyledBox>
                <SmallTitle>推荐用户</SmallTitle>
                <Spin spinning={loading}>
                  {users.map(x => (
                    <StyledUserCell key={x.id} user={x} showDescription showFollow />
                  ))}
                </Spin>
              </StyledBox>
            </Affix>
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
}
export default Timeline
