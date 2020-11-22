import styled from 'styled-components'

const Container = styled.span`
  color: rgba(0, 0, 0, 0.85);
  font-size: 24px;
  span {
    color: #999;
    font-size: 14px;
  }
`

const Fraction = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}
export default Fraction
