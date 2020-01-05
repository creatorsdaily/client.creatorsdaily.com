import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import pick from 'lodash/pick'

export const formToProduct = form => {
  const data = omitBy(form, isUndefined)
  if (data.icon) {
    data.icon = {
      id: data.icon
    }
  }
  if (data.miniProgramQRCode) {
    data.miniProgramQRCode = {
      id: data.miniProgramQRCode
    }
  }
  if (data.topics) {
    data.topics = data.topics.map(x => ({
      id: x
    }))
  }
  if (data.medias) {
    data.medias = data.medias.map(x => ({
      id: x
    }))
  }
  if (data.links) {
    data.links = data.links.filter(x => !!x)
  }
  return data
}

export const productToForm = product => {
  const data = pick(omitBy(product, isUndefined), [
    'name', 'description', 'topics', 'medias', 'content', 'icon', 'links', 'isMiniProgram', 'miniProgramQRCode'
  ])
  if (data.icon) {
    data.icon = data.icon.id
  }
  if (data.miniProgramQRCode) {
    data.miniProgramQRCode = data.miniProgramQRCode.id
  }
  if (data.topics.length) {
    data.topics = data.topics.map(x => x.id)
  }
  if (data.medias.length) {
    data.medias = data.medias.map(x => x.id)
  }
  if (data.links) {
    data.links = data.links.filter(x => !!x)
  }
  return data
}
