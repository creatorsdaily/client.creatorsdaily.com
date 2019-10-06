import { Button } from 'antd'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import useToggle from 'react-use/lib/useToggle'
import { useEffect, useRef } from 'react'
import Article from './Article'

const More = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100px;
  line-height: 100px;
  background: #FFF;
  width: 100%;
  text-align: center;
  background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1));
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

const StyledArticle = styled(Article)`
  overflow: hidden;
  position: relative;
  height: ${({ more }) => more === 'true' ? 'auto' : '160px'};
`

const Container = styled.div`
  height: ${({ height }) => height};
  overflow: hidden;
`

export default ({ content, full = false, ...rest }) => {
  const [more, setMore] = useToggle(true)
  const [checked, setChecked] = useToggle(false)
  const ref = useRef()
  useEffect(() => {
    if (!ref.current) return
    if (!full && !checked) {
      setMore(ref.current.offsetHeight < 160)
      setChecked(true)
    }
  })
  if (!content) {
    return (
      <div {...rest} style={{ padding: 0 }} />
    )
  }
  const renderMore = () => {
    if (more) return null
    return (
      <More>
        <Button icon='down' type='link' onClick={() => setMore(true)}>查看更多</Button>
      </More>
    )
  }
  return (
    <Container height={full ? 'auto' : (checked ? 'auto' : '160px')}>
      <StyledArticle {...rest} ref={ref} more={more.toString()}>
        <ReactMarkdown source={content} />
        {renderMore()}
      </StyledArticle>
    </Container>
  )
}
