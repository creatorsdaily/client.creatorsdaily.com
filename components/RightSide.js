import { Affix } from 'antd'
import styled from 'styled-components'
import noop from 'lodash/noop'
import Box from './Box'
import WeChatOfficialAccount from './WeChatOfficialAccount'

const StyledBox = styled(Box)`
padding: 16px;
img {
  max-width: 100%;
}
`

const Title = styled.h3`
  font-size: 14px;
  text-align: center;
`

export default ({ onQuestion = noop, onProduct = noop }) => {
  return (
    <Affix offsetTop={24}>
      <StyledBox>
        <Title>微信公众号</Title>
        <WeChatOfficialAccount title='微信关注：一群创造者' />
      </StyledBox>
    </Affix>
  )
}
