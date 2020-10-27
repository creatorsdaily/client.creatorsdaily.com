import { Divider, Form } from 'antd'
import cookie from 'component-cookie'
import gql from 'graphql-tag'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import redirect from '../libs/redirect'
import formError from '../libs/form-error'
import SigninForm from './SigninForm'

const SIGNIN = gql`
mutation($username: String!, $password: String!) {
  signin(username: $username, password: $password) {
    id
    username
    nickname
    token
    oneSignal
  }
}
`

const SigninBox = ({ back = '/' }) => {
  const client = useApolloClient()
  const [form] = Form.useForm()
  const [signin, { loading }] = useMutation(SIGNIN, {
    onCompleted: data => {
      cookie('token', data.signin.token, {
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
      <Divider>账号密码登录</Divider>
      <SigninForm
        form={form}
        loading={loading}
        onFinish={({ username, password }) => {
          signin({
            variables: {
              username: username,
              password: password
            }
          })
        }}
      />
    </>
  )
}
export default SigninBox
