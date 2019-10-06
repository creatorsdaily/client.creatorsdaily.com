import styled from 'styled-components'
import { Fragment } from 'react'

const Image = styled.img`
max-width: 256px;
max-height: 256px;
display: block;
margin: 0 auto;
`

const Title = styled.div`
font-size: 12px;
color: #999;
text-align: center;
`

export default ({ title }) => {
  return (
    <Fragment>
      <Image src='/static/wechat-official-account.png' />
      {title && (<Title>{title}</Title>)}
    </Fragment>
  )
}
