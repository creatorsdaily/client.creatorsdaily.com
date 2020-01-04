import { useSubscription } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import cookie from 'component-cookie'
import styled from 'styled-components'
import redirect from '../libs/redirect'

const isBrowser = typeof window !== 'undefined'

const MINI_PROGRAM_SINGINED = gql`
  subscription miniProgramSignined ($code: String!) {
    miniProgramSignined (code: $code) {
      token
    }
  }
`

const Image = styled.img`
width: 160px;
height: 160px;
display: block;
margin: 0 auto;
`

const Tips = styled.div`
font-size: 12px;
text-align: center;
margin-top: 24px;
`

export default ({ code, back = '/', ...rest }) => {
  useSubscription(MINI_PROGRAM_SINGINED, {
    variables: {
      code
    },
    skip: !isBrowser,
    onSubscriptionData: ({ client, subscriptionData: { data } }) => {
      cookie('token', data.miniProgramSignined.token, {
        path: '/',
        maxage: 7 * 24 * 60 * 60 * 1000
      })
      client.resetStore().then(() => {
      // client.cache.reset().then(() => {
        redirect(back)
      })
    }
  })
  return (
    <div {...rest}>
      <Image src={`${process.env.API}/auth/wxacode?code=${code}&size=200`} />
      <Tips>打开微信扫一扫，快速登录</Tips>
    </div>
  )
}
