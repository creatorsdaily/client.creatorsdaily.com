import get from 'lodash/get'

export default ({ graphQLErrors = [], networkError, message }) => {
  let errors = []
  if (!graphQLErrors.length && !networkError && message) {
    errors.push(new Error(message))
  }
  errors = [
    ...graphQLErrors.map(x => {
      if (typeof x.message === 'string') {
        return x
      }
      return new Error(x.message.error)
    }),
    ...get(networkError, 'result.errors', []),
    ...errors
  ]
  return errors
}
