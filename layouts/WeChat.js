import styled from 'styled-components'

const Container = styled.div`
background: #F0F0F0;
overflow: hidden;
`

const Content = styled.div`
background: #FFF;
margin: 24px auto;
max-width: 420px;
box-shadow: 0 0 25px rgba(0,0,0,0.1);
`

export default ({
  children,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <Content>
        <div style={{ padding: 24 }}>
          {children}
        </div>
      </Content>
    </Container>
  )
}
