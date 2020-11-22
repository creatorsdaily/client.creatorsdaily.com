import React, { useState } from 'react'
import Head from 'next/head'
import { Button, Col, Divider, Form, Input, Row, Spin } from 'antd'
import { gql, useMutation } from '@apollo/client'
import withApollo from '../../libs/with-apollo'
import Setting from '../../layouts/Setting'
import useAuth from '../../hooks/useAuth'
import graphqlError from '../../libs/graphql-error'
import useTimer from '../../hooks/useTimer'
import Viewer from '../../queries/Viewer.gql'
import message from '../../libs/message.dynamic'

const GET_CODE = gql`
mutation GetCode($func: String!, $account: String!, $type: String) {
  getCode(func: $func, account: $account, type: $type) {
    message
  }
}
`

const CHANGE_MOBILE = gql`
mutation ChangeMobile($mobile: String!, $code: String!) {
  changeMobile(mobile: $mobile, code: $code) {
    mobile
  }
}
`

export default withApollo(() => {
  const { viewer, loading } = useAuth()
  const [form] = Form.useForm()
  const [time, setTime] = useState(0)
  const counter = useTimer(count => {
    setTime(60 - count)
    if (count < 60) {
      return
    }
    return () => {
      setTime(0)
    }
  })
  const isBound = viewer && viewer.mobile != null
  const [getCode, { loading: codeLoading }] = useMutation(GET_CODE, {
    onCompleted: () => counter(),
    onError: error => {
      const err = graphqlError(error)[0]
      message.error(err.message)
    }
  })
  const [changeMobile, { loading: mobileLoading }] = useMutation(CHANGE_MOBILE, {
    onError: error => {
      const err = graphqlError(error)[0]
      message.error(err.message)
    },
    update (cache, { data: { changeMobile } }) {
      console.log(cache, changeMobile)
      cache.writeQuery({
        query: Viewer,
        data: {
          viewer: {
            ...viewer,
            mobile: changeMobile.mobile
          }
        }
      })
    }
  })
  const renderForm = () => {
    return (
      <Form form={form} layout='vertical'>
        <Form.Item
          label='手机号'
          name='mobile'
          rules={[{ required: true, pattern: /^[1]([3-9])[0-9]{9}$/, message: '请输入正确的手机号码！' }]}
        >
          <Row gutter={8}>
            <Col span={12}>
              <Input placeholder='请输入手机号' />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {({ getFieldError, getFieldValue }) => {
            const errors = getFieldError(['mobile'])
            const account = getFieldValue('mobile')
            return (
              <Form.Item
                label='验证码'
                name='code'
                rules={[{ required: true, len: 4, message: '请输入验证码！' }]}
              >
                <Row gutter={8}>
                  <Col span={12}>
                    <Input />
                  </Col>
                  <Col span={12}>
                    <Button
                      type='link'
                      loading={codeLoading}
                      disabled={!account || errors.length || time}
                      onClick={() => {
                        getCode({
                          variables: {
                            func: 'verify',
                            account: account,
                            type: 'mobile'
                          }
                        })
                      }}
                    >{time ? `等待 ${time} 秒后重试` : '获取验证码'}
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            )
          }}
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {({ getFieldError, getFieldValue }) => {
            const mobileErrors = getFieldError(['mobile'])
            const codeErrors = getFieldError(['code'])
            const account = getFieldValue('mobile')
            const code = getFieldValue('code')
            const errors = [...mobileErrors, ...codeErrors]
            return (
              <Form.Item>
                <Button
                  type='primary'
                  loading={mobileLoading}
                  disabled={!account || !code || errors.length}
                  onClick={() => {
                    changeMobile({
                      variables: {
                        mobile: account,
                        code: code
                      }
                    })
                  }}
                >提交
                </Button>
              </Form.Item>
            )
          }}
        </Form.Item>
      </Form>
    )
  }
  const renderResult = () => {
    return (
      <div>
        当前已绑定手机号码：<strong>{viewer.mobile}</strong>
      </div>
    )
  }
  return (
    <Setting>
      <Head>
        <title>绑定手机号 - {process.env.NAME}</title>
      </Head>
      <Spin spinning={loading}>
        <div>绑定手机号</div>
        <Divider />
        {isBound ? renderResult() : renderForm()}
      </Spin>
    </Setting>
  )
})
