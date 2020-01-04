import get from 'lodash/get'

export default err => {
  const { graphQLErrors = [], networkError, message } = err
  let errors = []
  if (!graphQLErrors.length && !networkError && message) {
    errors.push(new Error(message))
  }
  errors = [
    ...graphQLErrors.map(x => {
      if (typeof x.message === 'string') {
        return x
      }
      const e = new Error(x.message.error)
      e.statusCode = x.message.statusCode
      return e
    }),
    ...get(networkError, 'result.errors', []),
    ...errors
  ]
  if (!errors.length) {
    errors.push(err)
  }
  return errors
}
