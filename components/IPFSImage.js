import { Empty } from 'antd'
import styled from 'styled-components'

const StyledEmpty = styled(Empty)`
  margin: 0;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100%;
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
  }
  .ant-empty-image {
    height: 20px;
    margin-bottom: 0;
    width: 40px;
    transform: translateY(4px);
    svg {
      width: 40px;
    }
  }
`

export default ({ hash, size, ...rest }) => {
  if (!hash) {
    if (size === 'small') {
      return (
        <SmallEmpty description='无图片' image={Empty.PRESENTED_IMAGE_SIMPLE} {...rest} />
      )
    }
    return (
      <StyledEmpty description='暂无图片' image={Empty.PRESENTED_IMAGE_SIMPLE} {...rest} />
    )
  }
  return (
    <img {...rest} src={`${process.env.FILES}/${hash}`} />
  )
}
