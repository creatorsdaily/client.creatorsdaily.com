import styled from 'styled-components'

const Image = styled.img`
max-width: 180px;
max-height: 180px;
display: block;
margin: 0 auto;
`

const Title = styled.div`
font-size: 12px;
color: #707070;
text-align: center;
`

const WeChatOfficialAccount = ({ title }) => {
  return (
    <>
      <Image alt={title} src='/wechat-official-account.png' />
      {title && (<Title>{title}</Title>)}
    </>
  )
}
export default WeChatOfficialAccount
