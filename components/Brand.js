import styled from 'styled-components'
import media from '../libs/media'
import Logo from './Logo'

const Container = styled.div`
  display: flex;
  height: 64px;
  align-items: center;
`

const StyledLogo = styled(Logo)`
  width: 40px;
  height: 40px;
`

const StyledName = styled.h1`
  color: #262626;
  font-size: 16px;
  padding: 0 12px;
  margin: 0;
  font-weight: normal;
  flex: 1;
  display: none;
  ${media.md`
    display: block;
  `}
`

export default ({ name, ...rest }) => {
  return (
    <Container {...rest}>
      <StyledLogo />
      <StyledName>{name}</StyledName>
    </Container>
  )
}
