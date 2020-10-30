import { useMutation } from '@apollo/client'
import styled from 'styled-components'
import { Button } from 'antd'
import Follow from '../queries/mutations/Follow.gql'
import Unfollow from '../queries/mutations/Unfollow.gql'
import useViewer from '../hooks/useViewer'

const StyledButton = styled(Button)`
font-size: 12px;
padding: 0 12px;
&.ant-btn-text {
  color: #666;
  background: rgba(0, 0, 0, 0.05);
}
&.ant-btn-text:hover {
  background: rgba(0, 0, 0, 0.018);
}
`

const FollowButton = ({ user, ...rest }) => {
  const { viewer } = useViewer()
  const [follow, {
    loading: followLoading
  }] = useMutation(Follow)
  const [unfollow, {
    loading: unfollowLoading
  }] = useMutation(Unfollow)
  const onFollow = () => {
    if (user.isFollowing) {
      unfollow({
        variables: {
          user: user.id
        }
      })
    } else {
      follow({
        variables: {
          user: user.id
        }
      })
    }
  }
  if (!viewer || viewer.id === user.id) return null
  return (
    <StyledButton
      loading={followLoading && unfollowLoading}
      type={user.isFollowing ? 'text' : 'dashed'}
      size='small'
      onClick={onFollow}
      {...rest}
    >{user.isFollowing ? '已关注' : '关注'}
    </StyledButton>
  )
}

export default FollowButton
