import styled from 'styled-components'
import { Fragment } from 'react'

const Image = styled.img`
display: block;
margin: 0 auto;
`

const Title = styled.div`
font-size: 12px;
color: #707070;
text-align: center;
`

export default ({ title, hideTitle = false }) => {
  return (
    <Fragment>
      <Image alt={title} src='/zsxq.jpg' />
      {title && !hideTitle && (<Title>{title}</Title>)}
    </Fragment>
  )
}
