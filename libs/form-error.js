import graphqlError from './graphql-error'

export default (form, error, field) => {
  const errors = graphqlError(error)
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
