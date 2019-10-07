import Editor from 'react-simple-code-editor'
import Highlight, { Prism } from 'prism-react-renderer'
import { Fragment, forwardRef } from 'react'
import styled from 'styled-components'
import theme from '../libs/codeTheme'

const StyledEditor = styled(Editor)`
  line-height: 24px;
  min-height: ${({ type }) => type === 'mini' ? 32 : 56}px;
  textarea {
    border-radius: 4px;
    border: 1px solid #E8E8E8 !important;
    transition: border 0.35s ease;
    padding: 4px 10px;
  }
  pre {
    padding: 4px 10px;
  }
  textarea:focus {
    outline: none;
    border: 1px solid #e06c72 !important;
  }
  textarea::placeholder {
    color: #bfbfbf;
  }
`

const highlightCode = code => (
  <Highlight
    Prism={Prism}
    code={code}
    theme={theme}
    language='markdown'
  >
    {({ tokens, getLineProps, getTokenProps }) => (
      <Fragment>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </Fragment>
    )}
  </Highlight>
)

export default forwardRef(({ onChange, ...rest }, ref) => {
  return (
    <StyledEditor
      {...rest}
      onValueChange={onChange}
      highlight={highlightCode}
      padding={'2px 4px'}
      style={{
        ...theme.plain
        // minHeight: 40,
        // whiteSpace: 'pre',
        // fontFamily: 'monospace'
      }}
    />
  )
})
