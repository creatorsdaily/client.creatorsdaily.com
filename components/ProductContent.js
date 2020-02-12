import { Button } from 'antd'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import useToggle from 'react-use/lib/useToggle'
import { useEffect, useRef } from 'react'
import { DownOutlined } from '@ant-design/icons'
import Article from './Article'

const More = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: ${({ height }) => height - 60}px;
  line-height: ${({ height }) => height - 60}px;
  background: #FFF;
  width: 100%;
  text-align: center;
  background: ${({ background }) => background};
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

const StyledArticle = styled(Article)`
font-size: 14px;
overflow: hidden;
position: relative;
height: ${({ more }) => more === 'true' ? 'auto' : `${({ height }) => height - 60}px`};
`

const Container = styled.div`
  height: ${({ height }) => height};
  overflow: hidden;
`

export default ({
  content,
  background = 'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1))',
  height = 160,
  full = false,
  ...rest
}) => {
  const [more, setMore] = useToggle(true)
  const [checked, setChecked] = useToggle(false)
  const ref = useRef()
  useEffect(() => {
    if (!ref.current) return
    if (!full && !checked) {
      setMore(ref.current.offsetHeight < height)
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
      <More height={height} background={background}>
        <Button icon={<DownOutlined />} type='link' onClick={() => setMore(true)}>查看全部</Button>
      </More>
    )
  }
  return (
    <Container height={full ? 'auto' : (checked ? 'auto' : `${height}px`)}>
      <StyledArticle {...rest} height={height} ref={ref} more={more.toString()}>
        <ReactMarkdown source={content} />
        {renderMore()}
      </StyledArticle>
    </Container>
  )
}
