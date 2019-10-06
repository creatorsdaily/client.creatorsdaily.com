const GithubSignin = () => null
GithubSignin.getInitialProps = async context => {
  const { res, query } = context
  const back = query.back || '/'
  const target = `${process.env.API}/auth/github?back=${back}`
  if (process.browser) {
    location.href = target
  } else {
    res.writeHead(303, { Location: target })
    res.end()
  }
  return {}
}
export default GithubSignin
