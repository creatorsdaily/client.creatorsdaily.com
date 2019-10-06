import Link from 'next/link'
import styled from 'styled-components'
import { Button, Divider, Icon } from 'antd'

const Links = styled.div`
  margin-bottom: 24px;
`

const StyledButton = styled(Button)`
  font-family: monospace;
  height: 60px;
  display: flex;
  align-items: center;
  i {
    height: 34px;
    line-height: 34px;
    font-size: 34px;
    color: #999;
  }
  .anticon-right {
    height: 20px;
    line-height: 20px;
    font-size: 20px;
  }
`

const ButtonContent = styled.div`
  margin-left: 12px;
  text-align: left;
  flex: 1;
  display: block;
  min-width: 0;
`

const ButtonName = styled.div`
  color: #000;
  font-size: 13px;
  font-weight: 600;
`

const ButtonLink = styled.div`
  font-size: 12px;
  color: #6f6f6f;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export default ({ links, ...rest }) => {
  if (!links.length) return null
  const list = links.map(({ id, url, name }) => (
    <Link key={id} href='/links/[id]' as={`/links/${id}`}>
      <StyledButton block>
        <Icon type='compass' theme='filled' />
        <ButtonContent>
          <ButtonName>{name || '网址'}</ButtonName>
          <ButtonLink>{url}</ButtonLink>
        </ButtonContent>
        <Icon type='right' />
      </StyledButton>
    </Link>
  ))
  return (
    <Links {...rest}>
      <Divider orientation='left'>链接</Divider>
      {list}
    </Links>
  )
}
