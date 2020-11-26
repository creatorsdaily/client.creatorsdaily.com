import axios from 'axios'
import redirect from '../../../libs/redirect'
import setCookie from '../../../libs/setCookie'

const GithubSignin = () => null
GithubSignin.getInitialProps = async context => {
  const { res, query } = context
  const maxage = 7 * 24 * 60 * 60
  const { data: user } = await axios.get(`${process.env.NEXT_PUBLIC_API}/auth/github/callback`, {
    params: query
  })

  setCookie(res, 'token', user.token, {
    maxage: maxage,
    path: '/'
  })

  redirect('/', context)
  return {}
}
export default GithubSignin
