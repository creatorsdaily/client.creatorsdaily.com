import styled from 'styled-components'
import media from '../libs/media'

export default styled.div`
  background: #FFF;
  margin-bottom: 24px;
  border-radius: 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #FFF;
  transition: border-color 0.25s;
  ${media.sm`
    border-radius: 3px;
  `}
  &:hover {
    border: 1px solid #E0E0E0;
  }
`
