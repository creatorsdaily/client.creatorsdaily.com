import React, { useRef } from 'react'
import Head from 'next/head'
import { Divider, Form, message } from 'antd'
import styled from 'styled-components'
import get from 'lodash/get'
import pick from 'lodash/pick'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import useAuth from '../../hooks/useAuth'
import ProfileForm, { formToProfile, profileToForm } from '../../components/ProfileForm'
import Avatar from '../../components/Avatar'
import formError from '../../libs/form-error'
import withApollo from '../../libs/with-apollo'
import Setting from '../../layouts/Setting'

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

const ProfileEditorForm = Form.create()(ProfileForm)

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

export default withApollo(() => {
  useAuth()
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
    }
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
    <Setting>
      <Head>
        <title>个人信息 - {process.env.NAME}</title>
      </Head>
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
    </Setting>
  )
})
