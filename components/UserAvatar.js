import { Avatar } from 'antd'
import UserOutlined from '@ant-design/icons/UserOutlined'
import avatarByUser from '../libs/avatarByUser'

const UserAvatar = ({ user, size = 32, ...rest }) => {
  const props = {
    ...rest
  }
  const url = avatarByUser(user, size)
  if (url) {
    props.src = url
  }
  return (
    <Avatar shape='square' icon={<UserOutlined />} size={size} alt={user.nickname} {...props} />
  )
}
export default UserAvatar
