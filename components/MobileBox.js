import { Button, Divider, Form, Input } from 'antd'
import cookie from 'component-cookie'
import gql from 'graphql-tag'
import { useApolloClient, useLazyQuery, useMutation } from '@apollo/react-hooks'
import get from 'lodash/get'
import { useState } from 'react'
import styled from 'styled-components'
import redirect from '../libs/redirect'
import formError from '../libs/form-error'
import CodeBox from '../components/CodeBox'

const SIGNIN = gql`
mutation SigninByMobile($mobile: String!, $code: String!) {
  signinByMobile(mobile: $mobile, code: $code) {
    token
  }
}
`
const SIGNUP = gql`
mutation SignupByMobile($mobile: String!, $code: String!) {
  signupByMobile(mobile: $mobile, code: $code) {
    token
  }
}
`
const CHECK_ACCOUNT = gql`
query CheckAccount($account: String!) {
  checkAccount(account: $account) {
    types
  }
}
`
const GET_CODE = gql`
mutation GetCode($func: String!, $account: String!, $type: String) {
  getCode(func: $func, account: $account, type: $type) {
    message
  }
}
`
const CodeItem = styled(Form.Item)`
.ant-form-item-explain {
  text-align: center;
}
`
const mobileRegex = /^[1]([3-9])[0-9]{9}$/
const MobileBox = ({ back = '/' }) => {
  const client = useApolloClient()
  const [form] = Form.useForm()
  const [account, setAccount] = useState()
  const [getCode, { getCodeLoading }] = useMutation(GET_CODE, {
    onCompleted: () => {
      setAccount(form.getFieldValue('account'))
    }
  })
  const [signin, { loading: signinLoading }] = useMutation(SIGNIN, {
    onCompleted: data => auth(data.signinByMobile.token),
    onError: error => formError(form, error, 'code')
  })
  const [signup, { loading: signupLoading }] = useMutation(SIGNUP, {
    onCompleted: data => auth(data.signupByMobile.token),
    onError: error => formError(form, error, 'code')
  })
  const [check, { loading: checkLoading, data }] = useLazyQuery(CHECK_ACCOUNT)
  const types = get(data, 'checkAccount.types') || []
  const needSignin = types.includes('mobile')
  const auth = token => {
    cookie('token', token, {
      path: '/',
      maxage: 7 * 24 * 60 * 60 * 1000
    })
    client.resetStore().then(() => redirect(back))
  }
  const onFinish = values => {
    const code = values.code
    if (needSignin) {
      signin({
        variables: {
          mobile: account,
          code: code
        }
      })
    } else {
      signup({
        variables: {
          mobile: account,
          code: code
        }
      })
    }
  }
  const renderInput = () => {
    return (
      <>
        <Form.Item
          name='account'
          hasFeedback={checkLoading}
          validateStatus={checkLoading ? 'validating' : undefined}
          validateFirst
          rules={[
            { required: true, pattern: mobileRegex, message: '请输入正确的手机号码！' },
            {
              validator (rule, value) {
                check({
                  variables: {
                    account: value
                  }
                })
                return Promise.resolve()
              }
            }
          ]}
        >
          <Input
            disabled={checkLoading}
            maxLength={11}
            placeholder='请输入手机号码'
          />
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {({ getFieldError, getFieldValue }) => {
            const errors = getFieldError(['account'])
            const account = getFieldValue('account')
            return (
              <Form.Item>
                <Button
                  type='link'
                  disabled={checkLoading || !data || errors.length}
                  loading={getCodeLoading}
                  block
                  danger
                  onClick={() => getCode({
                    variables: {
                      account,
                      func: needSignin ? 'signin' : 'signup',
                      type: 'mobile'
                    }
                  })}
                >下一步
                </Button>
              </Form.Item>
            )
          }}
        </Form.Item>
      </>
    )
  }
  const renderCode = () => {
    return (
      <>
        <CodeItem name='code'>
          <CodeBox />
        </CodeItem>
        <Form.Item>
          <Button
            size='large'
            type='link'
            htmlType='submit'
            loading={signinLoading || signupLoading}
            block
            danger
          >完成
          </Button>
        </Form.Item>
      </>
    )
  }
  return (
    <>
      <Divider>登录或注册</Divider>
      <Form form={form} onFinish={onFinish}>
        {account ? renderCode() : renderInput()}
      </Form>
    </>
  )
}
export default MobileBox
