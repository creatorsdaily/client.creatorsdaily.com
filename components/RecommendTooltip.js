import { Tooltip } from 'antd'

export default ({ children }) => {
  return (
    <Tooltip placement='top' mouseEnterDelay={2} title='推荐一个你认为最好的产品或选项'>
      {children}
    </Tooltip>
  )
}
