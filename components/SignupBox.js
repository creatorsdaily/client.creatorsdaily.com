import { Divider, Form } from 'antd'
import cookie from 'component-cookie'
import { gql, useApolloClient, useMutation } from '@apollo/client'
import redirect from '../libs/redirect'
import formError from '../libs/form-error'
import SignupForm from './SignupForm'

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
  const client = useApolloClient()
  const [form] = Form.useForm()
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
      formError(form, error, 'password')
    }
  })
  return (
    <>
      <Divider>注册账号</Divider>
      <SignupForm
        form={form}
        loading={loading}
        onFinish={({ username, password }) => {
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
