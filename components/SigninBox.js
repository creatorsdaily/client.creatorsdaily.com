import { Fragment, useRef } from 'react'
import { Form } from 'antd'
import cookie from 'component-cookie'
import gql from 'graphql-tag'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import redirect from '../libs/redirect'
import formError from '../libs/form-error'
import SigninForm from './SigninForm'
import ThirdSignin from './ThirdSignin'

const PageSigninForm = Form.create()(SigninForm)

const SIGNIN = gql`
mutation($username: String!, $password: String!) {
  signin(username: $username, password: $password) {
    id,
    username,
    token
  }
}
`

export default ({ back = '/' }) => {
  const ref = useRef()
  const client = useApolloClient()
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
      const { form } = ref.current.props
      formError(form, error, 'password')
    }
  })
  return (
    <Fragment>
      <PageSigninForm
        wrappedComponentRef={ref}
        loading={loading}
        onSubmit={({ username, password }) => {
          signin({
            variables: {
              username: username,
              password: password
            }
          })
        }}
      />
      <ThirdSignin back={back} />
    </Fragment>
  )
}
