import * as url from 'native-url'
import styled from 'styled-components'
import { Button, Divider, Icon, Input } from 'antd'
import { forwardRef, useEffect, useState } from 'react'
import noop from 'lodash/noop'

const Links = styled.div`
`

const StyledButton = styled(Button)`
  height: 60px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  i {
    height: 34px;
    line-height: 34px;
    font-size: 34px;
    color: #999;
    svg {
      transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
  .anticon-right {
    height: 20px;
    line-height: 20px;
    font-size: 20px;
  }
  :hover {
    i {
      color: #DE7B76;
    }
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
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
`

const InputsContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
position: relative;
input {
  margin-bottom: 8px;
}
`

const MoreButton = styled.div`
width: 100%;
position: absolute;
right: 0;
top: -32px;
display: flex;
justify-content: flex-end;
div {
  line-height: 32px;
  font-size: 12px;
  margin-right: 5px;
}
`

const InputLine = styled.div`
width: 100%;
display: flex;
button {
  margin-left: 8px;
}
`

export const Inputs = forwardRef(({ value = [''], onChange = noop, placeholder = '' }, ref) => {
  const [list, setList] = useState(value)
  useEffect(() => {
    fireChange(value.length ? value : [''])
  }, [value])
  const fireChange = v => {
    setList(v)
    onChange(v)
  }
  const handleChange = (ind, e) => {
    fireChange(value.map((x, i) => ind === i ? e.target.value : x))
  }
  const handleAdd = () => {
    fireChange([...value, ''])
  }
  const handleRemove = ind => {
    fireChange(value.filter((x, i) => i !== ind))
  }
  return (
    <InputsContainer>
      {list.map((x, i) => (
        <InputLine key={i}>
          <Input placeholder={i === 0 ? placeholder : '链接'} value={x} onChange={(e) => handleChange(i, e)} />
          {i !== 0 && (<Button type='dashed' icon='delete' onClick={() => handleRemove(i)} />)}
        </InputLine>
      ))}
      <MoreButton>
        <div>更多链接？点击添加</div>
        <Button icon='plus' type='link' onClick={handleAdd} />
      </MoreButton>
    </InputsContainer>
  )
})

export default ({ links, ...rest }) => {
  if (!links.length) return null
  const list = links.map(x => {
    const { host } = url.parse(x)
    let name = '网址'
    let icon = 'compass'
    if (host === 'apps.apple.com' || host === 'itunes.apple.com') {
      name = 'AppStore'
      icon = 'apple'
    }
    if (host === 'github.com') {
      name = 'GitHub'
      icon = 'github'
    }
    if (host === 'www.coolapk.com') {
      name = '酷安'
      icon = 'android'
    }
    if (host === 'play.google.com') {
      name = 'Google Play'
      icon = 'android'
    }
    if (host === 'mp.weixin.qq.com') {
      name = '微信公众号'
      icon = 'wechat'
    }
    if (host === 'chrome.google.com') {
      name = 'Chrome 应用商店'
      icon = 'chrome'
    }
    return (
      <a key={x} href={x} rel='noreferrer' target='_blank'>
        <StyledButton block>
          <Icon type={icon} theme='filled' />
          <ButtonContent>
            <ButtonName>{name}</ButtonName>
            <ButtonLink>{x}</ButtonLink>
          </ButtonContent>
          <Icon type='right' />
        </StyledButton>
      </a>
    )
  })
  return (
    <Links {...rest}>
      <Divider orientation='left'>链接</Divider>
      {list}
    </Links>
  )
}
