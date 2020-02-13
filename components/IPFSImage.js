import { Empty } from 'antd'
import styled from 'styled-components'

const StyledEmpty = styled(Empty)`
  margin: 0;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  p {
    color: #707070;
  }
`

const SmallEmpty = styled(Empty)`
  margin: 0;
  font-size: 12px;
  line-height: 20px;
  // background: #FFF;
  p {
    transform: scale(0.8) translateY(3px);
    margin: 0;
    white-space: nowrap;
    width: 100%;
    text-align: center;
    color: #707070;
  }
  .ant-empty-image {
    height: ${({ size }) => size === 'mini' ? 40 : 20}px;
    margin-bottom: 0;
    width: 40px;
    transform: translateY(${({ size }) => size === 'mini' ? 0 : 4}px);
    svg {
      width: 40px;
    }
  }
`

export default ({ hash, size, ...rest }) => {
  if (!hash) {
    if (size === 'small') {
      return (
        <SmallEmpty size={size} description='无图片' image={Empty.PRESENTED_IMAGE_SIMPLE} {...rest} />
      )
    } else if (size === 'mini') {
      return (
        <SmallEmpty size={size} description={false} image={Empty.PRESENTED_IMAGE_SIMPLE} {...rest} />
      )
    }
    return (
      <StyledEmpty size={size} description='暂无图片' image={Empty.PRESENTED_IMAGE_SIMPLE} {...rest} />
    )
  }
  return (
    <img {...rest} src={`${process.env.FILES}/${hash}`} />
  )
}
