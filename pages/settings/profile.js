import React from 'react'
import Head from 'next/head'
import { Divider, Form } from 'antd'
import styled from 'styled-components'
import get from 'lodash/get'
import { gql, useMutation } from '@apollo/client'
import useAuth from '../../hooks/useAuth'
import ProfileForm, { formToProfile, profileToForm } from '../../components/ProfileForm'
import UserAvatar from '../../components/UserAvatar'
import formError from '../../libs/form-error'
import withApollo from '../../libs/with-apollo'
import Setting from '../../layouts/Setting'
import message from '../../libs/message.dynamic'

const UPDATE_USER = gql`
mutation($user: IUser!) {
  updateUser(user: $user) {
    id
    nickname
    email
    link
    description
    avatar {
      id
      hash
    }
  }
}
`

const FormHeader = styled.div`
display: flex;
align-items: center;
margin-bottom: 24px;
`

const StyledAvatar = styled(UserAvatar)`
margin-right: 12px;
display: block;
`

const StyledInfo = styled.div`
line-height: 32px;
`

const Counter = styled.span`
font-weight: bold;
`

export default withApollo(() => {
  useAuth()
  const [form] = Form.useForm()
  const { viewer, loading: userLoading } = useAuth({
    onCompleted (data) {
      const profile = profileToForm(get(data, 'viewer', {}))
      form.setFieldsValue(profile)
    }
  })
  const [update, { loading }] = useMutation(UPDATE_USER, {
    onCompleted: data => {
      message.success('保存成功')
    },
    onError: error => {
      const errors = formError(form, error)
      message.error(errors[0].message)
    }
  })
  const user = viewer || {}
  const handleFinish = values => {
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
    <Setting>
      <Head>
        <title>个人信息 - {process.env.NAME}</title>
      </Head>
      <FormHeader>
        <StyledAvatar user={user} />
        <StyledInfo>{user.username}，{process.env.NAME}第 <Counter>{user.number}</Counter> 位成员</StyledInfo>
      </FormHeader>
      <Divider />
      <ProfileForm
        form={form}
        onFinish={handleFinish}
        loading={userLoading || loading}
      />
    </Setting>
  )
})
