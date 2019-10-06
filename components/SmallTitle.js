import styled from 'styled-components'
import media from '../libs/media'

export default styled.div`
font-size: 12px;
font-weight: bold;
margin-bottom: 6px;
height: 34px;
line-height: 34px;
padding: 0 16px;
${media.sm`
  padding: 0;
`}
`
