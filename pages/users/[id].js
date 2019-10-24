import styled from 'styled-components'
import { Affix, Button, Col, Row, Spin } from 'antd'
import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import Page from '../../layouts/Page'
import Container from '../../components/Container'
import { GET_USER } from '../../queries'
import Time from '../../components/Time'
import Avatar from '../../components/Avatar'

const StyledContainer = styled(Container)`
margin: 24px auto;
`

const UserContainer = styled.div`
display: flex;
align-items: center;
margin-bottom: 24px;
.ant-avatar {
  margin-right: 8px;
}
`

export default () => {
  const { query } = useRouter()
  const { data, loading } = useQuery(GET_USER, {
    variables: {
      id: query.id
    }
  })
  const user = get(data, 'user', {})
  return (
    <Page>
      <Head>
        <title>{user.nickname} - {process.env.NAME}</title>
        <meta key='description' name='description' content={`${process.env.NAME}第 ${user.number} 位成员`} />
      </Head>
      <StyledContainer>
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <UserContainer>
              <Avatar user={user} />
              <div>
                <b>{user.nickname}</b> 是{process.env.NAME}第 <b>{user.number}</b> 位成员
              </div>
            </UserContainer>
            <div>
              <b><Time time={user.createdAt} format='YYYY年M月D日' /></b> 加入社区
            </div>
          </Col>
          <Col md={12} xs={0} />
        </Row>
      </StyledContainer>
    </Page>
  )
}
