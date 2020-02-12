import { Avatar } from 'antd'
import md5 from 'crypto-js/md5'
import UserOutlined from '@ant-design/icons/UserOutlined'

export default ({ user, size = 32, ...rest }) => {
  const props = {
    ...rest
  }
  if (user.avatar) {
    props.src = `${process.env.FILES}/${user.avatar.hash}-${size * 2}-${size * 2}`
  } else if (user.email) {
    props.src = `https://www.gravatar.com/avatar/${user.email ? md5(user.email) : ''}?size=${size * 2}&d=monsterid`
  }
  return (
    <Avatar shape='square' icon={<UserOutlined />} size={size} alt={user.nickname} {...props} />
  )
}
