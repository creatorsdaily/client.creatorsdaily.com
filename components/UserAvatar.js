import { Avatar } from 'antd'
import UserOutlined from '@ant-design/icons/UserOutlined'

const UserAvatar = ({ user, size = 32, ...rest }) => {
  const props = {
    ...rest
  }
  if (user.avatar) {
    props.src = `${process.env.FILES}/${user.avatar.hash}-${size * 2}-${size * 2}`
  } else if (user.emailMD5) {
    props.src = `https://www.gravatar.com/avatar/${user.emailMD5}?size=${size * 2}&d=monsterid`
  }
  return (
    <Avatar shape='square' icon={<UserOutlined />} size={size} alt={user.nickname} {...props} />
  )
}
export default UserAvatar
