import get from 'lodash/get'

export default (form, { graphQLErrors = [], networkError, message }, field) => {
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
  if (field) {
    form.setFields({
      [field]: {
        value: form.getFieldValue(field),
        errors
      }
    })
  }
  return errors
}
