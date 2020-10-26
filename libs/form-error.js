import graphqlError from './graphql-error'

const FormError = (form, error, field) => {
  const errors = graphqlError(error)
  if (field) {
    form.setFields([{
      touched: true,
      validating: false,
      errors: errors.map(x => x.message),
      name: field,
      value: form.getFieldValue(field)
    }])
  }
  return errors
}
export default FormError
