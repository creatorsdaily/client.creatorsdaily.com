import React, { useRef } from 'react'
import Head from 'next/head'
import { Col, Divider, Form, Menu, Row, message } from 'antd'
import styled from 'styled-components'
import get from 'lodash/get'
import pick from 'lodash/pick'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import Page from '../../layouts/Page'
import Container from '../../components/Container'
import useAuth from '../../hooks/useAuth'
import ProfileForm, { formToProfile, profileToForm } from '../../components/ProfileForm'
import Avatar from '../../components/Avatar'
import SmallTitle from '../../components/SmallTitle'
import formError from '../../libs/form-error'
import { VIEWER } from '../../queries'

const UPDATE_USER = gql`
mutation($user: IUser!) {
  updateUser(user: $user) {
    id
    nickname
    email
    avatar {
      id,
      hash
    }
  }
}
`

const StyledContainer = styled(Container)`
margin: 24px auto;
`

const ProfileEditorForm = Form.create()(ProfileForm)

const FormContainer = styled.div`
background: #FFF;
padding: 24px;
`

const FormHeader = styled.div`
display: flex;
align-items: center;
margin-bottom: 24px;
`

const StyledAvatar = styled(Avatar)`
margin-right: 12px;
display: block;
`

const StyledInfo = styled.div`
line-height: 32px;
`

const Counter = styled.span`
font-weight: bold;
`

const MenuContainer = styled.div`
  margin-bottom: 24px;
`

export default () => {
  const ref = useRef()
  const { viewer, loading: userLoading } = useAuth({
    onCompleted (data) {
      const profile = profileToForm(get(data, 'viewer', {}))
      const { form } = ref.current.props
      form.setFieldsValue(pick(profile, Object.keys(form.getFieldsValue())))
    }
  })
  const [update, { loading }] = useMutation(UPDATE_USER, {
    onCompleted: data => {
      message.success('保存成功')
    },
    onError: error => {
      const { form } = ref.current.props
      const errors = formError(form, error)
      message.error(errors[0].message)
    },
    refetchQueries: () => [{ query: VIEWER }]
  })
  const user = viewer || {}
  const handleSubmit = values => {
    update({
      variables: {
        user: {
          id: user.id,
          ...formToProfile(values)
        }
      }
    })
  }
  return (
    <Page>
      <Head>
        <title>编辑 - {process.env.NAME}</title>
      </Head>
      <StyledContainer>
        <Row gutter={24}>
          <Col xl={4} lg={5} md={6} sm={24}>
            <MenuContainer>
              <SmallTitle>设置</SmallTitle>
              <Menu selectedKeys={['profile']} mode='inline'>
                <Menu.Item key='profile'>个人信息</Menu.Item>
                <Menu.Item disabled key='password'>修改密码</Menu.Item>
              </Menu>
            </MenuContainer>
          </Col>
          <Col xl={12} lg={14} md={18} sm={24}>
            <FormContainer>
              <FormHeader>
                <StyledAvatar user={user} />
                <StyledInfo>{user.username}，{process.env.NAME}第 <Counter>{user.number}</Counter> 位成员</StyledInfo>
              </FormHeader>
              <Divider />
              <ProfileEditorForm
                onSubmit={handleSubmit}
                loading={userLoading || loading}
                wrappedComponentRef={ref}
              />
            </FormContainer>
          </Col>
          <Col xl={8} lg={5} md={24} sm={24} />
        </Row>
      </StyledContainer>
    </Page>
  )
}
