import styled from 'styled-components'

const Image = styled.img`
display: block;
margin: 0 auto;
`

const Title = styled.div`
font-size: 12px;
color: #707070;
text-align: center;
`

const ZSXQ = ({ title, hideTitle = false }) => {
  return (
    <>
      <Image alt={title} src='/zsxq.jpg' />
      {title && !hideTitle && (<Title>{title}</Title>)}
    </>
  )
}

export default ZSXQ
