import gql from 'graphql-tag'

export const VIEWER = gql`
query {
  viewer {
    id
    nickname
    username
    token
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
    id
    name
    description
    content
    isLike
    isCreator
    isDiscoverer
    likeCount
    discovererId
    icon {
      id
      hash
    }
    discoverer {
      id
      nickname
      username
    }
    creators {
      id
      nickname
      username
    }
    topics {
      id
      name
    }
    medias {
      id
      hash
    }
    links
  }
}
`

export const GET_PRODUCTS = gql`
query($page: Int, $size: Int, $topic: [String!], $keyword: [String!]) {
  getProducts(page: $page, size: $size, topic: $topic, keyword: $keyword) {
    total
    data {
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

export const GET_POSTS = gql`
query($page: Int, $size: Int) {
  getPosts(page: $page, size: $size) {
    total
    data {
      id
      title
      description
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
    },
    count
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
    id
    nickname
  }
}
query($page: Int, $size: Int, $productId: String!) {
  getComments(page: $page, size: $size, productId: $productId) {
    data {
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
