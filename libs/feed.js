import { Feed } from 'feed'

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN

const site = `https://${DOMAIN}`

const createFeed = () => new Feed({
  title: process.env.NEXT_PUBLIC_NAME,
  description: process.env.NEXT_PUBLIC_DESCRIPTION,
  id: site,
  link: site,
  language: 'zh', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: `${site}/icon.png`,
  favicon: `${site}/favicon.ico`,
  copyright: process.env.NEXT_PUBLIC_NAME,
  feedLinks: {
    json: `${site}/api/json`,
    atom: `${site}/api/atom`
  },
  author: {
    name: process.env.NEXT_PUBLIC_NAME,
    email: 'tengfei@tengfei.fun',
    link: site
  }
})

export default (list = []) => {
  const feed = createFeed()
  list.forEach(x => {
    const link = `${site}/${x.id}`
    const item = {
      title: x.name,
      id: link,
      link,
      description: x.description,
      content: x.content,
      author: [{
        name: x.discoverer.nickname,
        email: x.discoverer.email
      }],
      date: new Date(x.createdAt)
    }
    if (x.icon && x.icon.hash) {
      item.image = `${process.env.NEXT_PUBLIC_FILES}/${x.icon.hash}-100-100`
    }
    feed.addItem(item)
  })
  return feed
}

export const posts = (list = []) => {
  const feed = createFeed()
  list.forEach(x => {
    const link = `${site}/posts/${x.id}`
    const item = {
      title: x.title,
      id: link,
      link,
      description: x.description,
      content: x.content,
      author: [{
        name: x.user.nickname,
        email: x.user.email
      }],
      date: new Date(x.createdAt)
    }
    if (x.media && x.media.hash) {
      item.image = `${process.env.NEXT_PUBLIC_FILES}/${x.media.hash}`
    }
    feed.addItem(item)
  })
  return feed
}
