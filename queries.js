import gql from 'graphql-tag'

const productFragment = `
id
name
description
isLike
likeCount
commentCount
createdAt
topics {
  id
  name
}
icon {
  id
  hash
}`

const userFragment = `
id
nickname
username
email
number
avatar {
  id
  hash
}
`

export const VIEWER = gql`
query {
  viewer {
    ${userFragment}
    token
    oneSignal
    createdAt
  }
}
`

export const GET_USER = gql`
query($id: String!, $createdPage: Int, $createdSize: Int, $discoveredPage: Int, $discoveredSize: Int) {
  user(id: $id) {
    ${userFragment}
    createdAt
    createdProducts(page: $createdPage, size: $createdSize) {
      total
      data {
        ${productFragment}
      }
    }
    discoveredProducts(page: $discoveredPage, size: $discoveredSize) {
      total
      data {
        ${productFragment}
      }
    }
  }
}
`

export const GET_MEDIA = gql`
query($id: String!) {
  getMedia(id: $id) {
    id
    hash
  }
}
`

export const GET_MEDIAS = gql`
query($ids: [String!]) {
  getMedias(ids: $ids) {
    data {
      id
      hash
    }
  }
}
`

export const GET_PRODUCT = gql`
query($id: String!) {
  product(id: $id) {
    ${productFragment}
    content
    discovererId
    links
    discoverer {
      ${userFragment}
    }
    creators {
      ${userFragment}
    }
    medias {
      id
      hash
    }
    milestones {
      data {
        id
        title
        content
        createdAt
      }
    }
  }
}
`

export const GET_PRODUCTS = gql`
query($page: Int, $size: Int, $topic: [String!], $keyword: [String!]) {
  getProducts(page: $page, size: $size, topic: $topic, keyword: $keyword) {
    total
    data {
      ${productFragment}
    }
  }
}
`

export const GET_POSTS = gql`
query($page: Int, $size: Int) {
  getPosts(page: $page, size: $size) {
    total
    data {
      id
      title
      description
      createdAt
      media {
        id
        hash
      }
      user {
        ${userFragment}
      }
      products {
        id
        name
        description
        isLike
        likeCount
        topics {
          id
          name
        }
        icon {
          id
          hash
        }
      }
    }
  }
}
`

export const GET_LINKS = gql`
query($page: Int, $size: Int) {
  getLinks(page: $page, size: $size) {
    total
    data {
      id
      name
      url
      media {
        id
        hash
      }
    }
  }
}
`

export const GET_POST = gql`
query($id: String!) {
  getPost(id: $id) {
    id
    title
    description
    content
    media {
      id
      hash
    }
    products {
      id
      name
      description
      isLike
      likeCount
      topics {
        id
        name
      }
      icon {
        id
        hash
      }
    }
  }
}
`

export const GET_TOPICS = gql`
query($page: Int, $size: Int, $keyword: [String!]) {
  getTopics(page: $page, size: $size, keyword: $keyword) {
    data {
      id
      name
      icon {
        id
        hash
      }
    }
    count
  }
}
`

export const GET_MILESTONES = gql`
query($page: Int, $size: Int, $productId: String) {
  getMilestones(page: $page, size: $size, productId: $productId) {
    total
    data {
      id
      title
      content
      createdAt
      product {
        ${productFragment}
      }
    }
  }
}
`

export const GET_MILESTONE = gql`
query($id: String!) {
  getMilestone(id: $id) {
    id
    title
    content
    createdAt
    user {
      ${userFragment}
    }
    product {
      ${productFragment}
      discovererId
      creators {
        ${userFragment}
      }
    }
  }
}
`

export const GET_COMMENTS = gql`
fragment CommentFields on Comment {
  id
  content
  createdAt
  parentId
  user {
    ${userFragment}
  }
}
query($page: Int, $size: Int, $productId: String, $milestoneId: String) {
  getComments(page: $page, size: $size, productId: $productId, milestoneId: $milestoneId) {
    data {
      product {
        ${productFragment}
        discovererId
        creators {
          ${userFragment}
        }
      }
      ...CommentFields
      children {
        ...CommentFields
        children {
          ...CommentFields
          children {
            ...CommentFields
            children {
              ...CommentFields
              children {
                ...CommentFields
                children {
                  ...CommentFields
                  children {
                    ...CommentFields
                    children {
                      ...CommentFields
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    total
  }
}
`
