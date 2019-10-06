import cookie from 'component-cookie'

export default (res, key, value, options = {}) => {
  if (process.browser) {
    cookie(key, value, options)
  } else {
    res.setHeader('set-cookie', `token=${value}; max-age=${options.maxage}; Path=${options.path}`)
  }
}
