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
color: #707070;
text-align: center;
`

export default ({ title }) => {
  return (
    <Fragment>
      <Image alt={title} src='/wechat-official-account.png' />
      {title && (<Title>{title}</Title>)}
    </Fragment>
  )
}
