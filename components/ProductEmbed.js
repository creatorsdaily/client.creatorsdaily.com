import { Divider, Result, Switch } from 'antd'
import styled from 'styled-components'
import { useState } from 'react'
import { LinkOutlined } from '@ant-design/icons'

const StyledLink = styled.a`
min-height: 54px;
display: inline-block;
`

const StyledSwitch = styled(Switch)`
margin-top: 16px;
background-color: #F0F0F0;
.ant-switch-inner {
  color: #707070;
  font-weight: bold;
}
&.ant-switch-checked {
  background-color: #24273f;
  .ant-switch-inner {
    color: #FFFFFF;
    font-weight: bold;
  }
}
`

const Code = styled.pre`
width: auto;
white-space: pre-line;
text-align: left;
font-size: 12px;
background: #F5F5F5;
padding: 12px;
margin: 16px 24px 0;
`

export default ({ id, name }) => {
  const link = `https://creatorsdaily.com/${id}`
  const [dark, setDark] = useState(false)
  const code = `<a href="${link}?utm_source=vote" target="_blank"><img src="https://creatorsdaily.com/api/${id}/vote.svg?theme=${dark ? 'dark' : 'light'}" /></a>`
  return (
    <Result
      status='info'
      title={`将「${name}」添加到网站`}
      subTitle={`你可以将专属于「${name}」的投票按钮或永久链接添加到你的网站上，让用户一起为产品投票吧！`}
      icon={(<LinkOutlined />)}
      extra={(
        <div>
          <Divider>投票按钮</Divider>
          <div>
            <StyledLink href={link + '?utm_source=vote'} target='_blank'>
              <img src={`/api/${id}/vote.svg?theme=${dark ? 'dark' : 'light'}`} />
            </StyledLink>
          </div>
          <StyledSwitch
            checkedChildren='暗' checked={dark} unCheckedChildren='亮' onChange={() => {
              setDark(!dark)
            }}
          />
          <Code>
            {code}
          </Code>
          <Divider>永久链接</Divider>
          <Code>{link}</Code>
        </div>
      )}
    />
  )
}
