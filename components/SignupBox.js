import { useRef } from 'react'
import { Divider, Form } from 'antd'
import cookie from 'component-cookie'
import gql from 'graphql-tag'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import redirect from '../libs/redirect'
import formError from '../libs/form-error'
import SignupForm from './SignupForm'

const PageSignupForm = Form.create()(SignupForm)

const SIGNUP = gql`
mutation($user: IUser!) {
  signup(user: $user) {
    id,
    username,
    token
  }
}
`

export default ({ back = '/' }) => {
  const ref = useRef()
  const client = useApolloClient()
  const [signup, { loading }] = useMutation(SIGNUP, {
    onCompleted: data => {
      cookie('token', data.signup.token, {
        path: '/',
        maxage: 7 * 24 * 60 * 60 * 1000
      })
      client.resetStore().then(() => {
      // client.cache.reset().then(() => {
        redirect(back)
      })
    },
    onError: error => {
      const { form } = ref.current.props
      formError(form, error, 'password')
    }
  })
  return (
    <>
      <Divider>注册账号</Divider>
      <PageSignupForm
        wrappedComponentRef={ref}
        loading={loading}
        onSubmit={({ username, password }) => {
          signup({
            variables: {
              user: {
                username: username,
                password: password
              }
            }
          })
        }}
      />
    </>
  )
}
