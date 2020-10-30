import { gql } from '@apollo/client'

export const productFragment = `
id
name
description
state
isLike
likeCount
commentCount
createdAt
publishedAt
diedAt
causeOfDeath
isMiniProgram
topics {
  id
  name
}
icon {
  id
  hash
}`

export const userFragment = `
id
nickname
username
email
number
mobile
createdAt
signinedAt
avatar {
  id
  hash
}
`

const questionFragment = `
id
name
createdAt
user {
  ${userFragment}
}
topics {
  id
  name
}
`

export const VIEWER_AUTHES = gql`
query {
  viewer {
    ${userFragment}
    link
    description
    authes {
      id
      type
      data
    }
    token
    oneSignal
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

export const SEARCH_PRODUCTS = gql`
query($page: Int, $size: Int, $score: Int, $keyword: String!) {
  searchProducts(page: $page, size: $size, score: $score, keyword: $keyword) {
    total
    data {
      codeCount
      ${productFragment}
      discoverer {
        ${userFragment}
      }
    }
  }
}
`

export const SEARCH_QUESTION = gql`
query($page: Int, $size: Int, $score: Int, $keyword: String!) {
  searchQuestion(page: $page, size: $size, score: $score, keyword: $keyword) {
    total
    data {
      ${questionFragment}
      options {
        rank
        value
        product {
          ${productFragment}
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

export const GET_WISH = gql`
query($id: String!) {
  getWish(id: $id) {
    id
    title
    content
    createdAt
    type
    isLike
    likeCount
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
