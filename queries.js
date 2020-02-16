import gql from 'graphql-tag'

export const productFragment = `
id
name
description
isLike
likeCount
commentCount
createdAt
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

const postFragment = `
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
  ${productFragment}
}
`

export const VIEWER = gql`
query {
  viewer {
    ${userFragment}
    link
    description
    token
    oneSignal
  }
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

export const GET_USER = gql`
query(
  $id: String!,
  $createdPage: Int, $createdSize: Int,
  $discoveredPage: Int, $discoveredSize: Int,
  $likedPage: Int, $likedSize: Int,
  $postPage: Int, $postSize: Int
) {
  user(id: $id) {
    ${userFragment}
    link
    description
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
    likedProducts(page: $likedPage, size: $likedSize) {
      total
      data {
        ${productFragment}
      }
    }
    posts(page: $postPage, size: $postSize) {
      total
      data {
        ${postFragment}
      }
    }
  }
}
`

export const GET_USERS = gql`
query($page: Int, $size: Int, $isCreator: Boolean, $ids: [String!]) {
  getUsers(page: $page, size: $size, isCreator: $isCreator, ids: $ids) {
    total
    data {
      ${userFragment}
      link
      description
      createdProducts {
        total
        data {
          ${productFragment}
        }
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
    codes {
      id
      code
      redeemedAt
      redeemer {
        ${userFragment}
      }
    }
    miniProgramQRCode {
      id
      hash
    }
    discoverer {
      ${userFragment}
    }
    creators {
      ${userFragment}
    }
    likes {
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
    wishes(size: 10) {
      data {
        id
        type
        title
        content
        isLike
        likeCount
        createdAt
        user {
          ${userFragment}
        }
      }
    }
    options {
      rank
      question {
        id
        name
      }
      ups {
        id
        reason
        positive
        createdAt
        user {
          ${userFragment}
        }
      }
      downs {
        id
        reason
        positive
        createdAt
        user {
          ${userFragment}
        }
      }
      value
    }
  }
}
`

export const GET_PRODUCTS = gql`
query($page: Int, $size: Int, $topic: [String!], $keyword: [String!], $order: String) {
  getProducts(page: $page, size: $size, topic: $topic, keyword: $keyword, order: $order) {
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
      name
    }
  }
}
`

export const GET_POSTS = gql`
query($page: Int, $size: Int, $user: String) {
  getPosts(page: $page, size: $size, user: $user) {
    total
    data {
      ${postFragment}
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
    content
    ${postFragment}
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

export const GET_COMMENT = gql`
fragment CommentFields on Comment {
  id
  content
  createdAt
  parentId
  productId
  milestoneId
  wishId
  user {
    ${userFragment}
  }
}
query($id: String!) {
  getComment(id: $id) {
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
          }
        }
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
  productId
  milestoneId
  wishId
  user {
    ${userFragment}
  }
}
query($page: Int, $size: Int, $productId: String, $milestoneId: String, $wishId: String) {
  getComments(page: $page, size: $size, productId: $productId, milestoneId: $milestoneId, wishId: $wishId) {
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
            }
          }
        }
      }
    },
    total
  }
}
`

export const GET_QUESTION = gql`
query($id: String!) {
  getQuestion(id: $id) {
    ${questionFragment}
    options {
      rank
      value
      questionId
      product {
        ${productFragment}
        medias {
          id
          hash
        }
      }
      ups {
        id
        reason
        positive
        createdAt
        user {
          ${userFragment}
        }
      }
      downs {
        id
        reason
        positive
        createdAt
        user {
          ${userFragment}
        }
      }
    }
  }
}
`

export const GET_QUESTIONS = gql`
query($page: Int, $size: Int, $topic: [String!], $user: String) {
  getQuestions(page: $page, size: $size, topic: $topic, user: $user) {
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
