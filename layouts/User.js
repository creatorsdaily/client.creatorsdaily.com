import styled from 'styled-components'
import { Col, Menu, Row, Spin } from 'antd'
import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import { Children, cloneElement } from 'react'
import Link from 'next/link'
import { AppstoreOutlined, BulbOutlined, FileTextOutlined, HeartOutlined, QuestionOutlined } from '@ant-design/icons'
import Page from '../layouts/Page'
import Container from '../components/Container'
import { GET_USER } from '../queries'
import UserCard from '../components/UserCard'
import RightSide from '../components/RightSide'
import LeftSide from '../components/LeftSide'
import MobileAuthBar from '../components/MobileAuthBar'
import media from '../libs/media'

const StyledContainer = styled(Container)`
margin: 24px auto;
.ant-menu-item {
  padding: 0 10px;
  ${media.md`
    padding: 0 15px;
  `}
}
`

const Div = styled.div``

export default ({ ContentContainer = Div, children }) => {
  const size = 15
  const { pathname, query: { id } } = useRouter()
  const query = [GET_USER, {
    id,
    discoveredSize: size
  }]
  const { data, loading, fetchMore } = useQuery(query[0], {
    variables: query[1],
    notifyOnNetworkStatusChange: true
  })
  const user = get(data, 'user', {})
  return (
    <Page>
      <Head>
        <title>{user.nickname} - {process.env.NAME}</title>
        <meta key='description' name='description' content={`${user.nickname}，${process.env.NAME}第 ${user.number} 位成员`} />
      </Head>
      <StyledContainer>
        <Row type='flex' gutter={24}>
          <Col
            xl={{
              order: 1,
              span: 14
            }} lg={18} md={16} xs={24}
          >
            <Spin spinning={loading}>
              <UserCard user={user} />
            </Spin>
            <ContentContainer>
              <Menu selectedKeys={[pathname]} mode='horizontal'>
                <Menu.Item key='/users/[id]'>
                  <Link href='/users/[id]' as={`/users/${id}`}>
                    <a>
                      <BulbOutlined />
                  动态
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item key='/users/[id]/products'>
                  <Link href='/users/[id]/products' as={`/users/${id}/products`}>
                    <a>
                      <AppstoreOutlined />
                  产品
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item key='/users/[id]/questions'>
                  <Link href='/users/[id]/questions' as={`/users/${id}/questions`}>
                    <a>
                      <QuestionOutlined />
                  问题
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item key='/users/[id]/posts'>
                  <Link href='/users/[id]/posts' as={`/users/${id}/posts`}>
                    <a>
                      <FileTextOutlined />
                  文章
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item key='/users/[id]/likes'>
                  <Link href='/users/[id]/likes' as={`/users/${id}/likes`}>
                    <a>
                      <HeartOutlined />
                  喜欢
                    </a>
                  </Link>
                </Menu.Item>
              </Menu>
              {Children.map(children, child => {
                return cloneElement(child, { id, user, loading, fetchMore })
              })}
            </ContentContainer>
          </Col>
          <Col xl={4} md={0} xs={24}>
            <LeftSide />
          </Col>
          <Col xl={{ order: 2 }} lg={6} md={8} xs={24}>
            <RightSide />
          </Col>
        </Row>
        <MobileAuthBar />
      </StyledContainer>
    </Page>
  )
}
