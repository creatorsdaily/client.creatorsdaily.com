import { forwardRef } from 'react'
import styled from 'styled-components'
import SimpleMDE from 'react-simplemde-editor'

const StyledEditor = styled(SimpleMDE)`
  line-height: 22px;
  .CodeMirror-wrap {
    border-radius: 4px;
    border: 1px solid #E8E8E8 !important;
    transition: border 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    padding: 0 5px;
  }
  .CodeMirror-sizer + div {
    display: none;
  }
  pre {
    padding: 4px 10px;
  }
  .CodeMirror-focused {
    border: 1px solid #e06c72 !important;
  }
  .CodeMirror-wrap::placeholder {
    color: #bfbfbf;
  }

  .cm-s-easymde {
    .cm-formatting,
    .cm-formatting-header,
    .cm-formatting-strong,
    .cm-formatting-link,
    .cm-hr {
      // color: rgba(0,0,0,.28);
      color: #efb73f;
      font-weight: normal;
      padding: 0 2px;
    }
    .cm-formatting-list-ol,
    .cm-formatting-list-ul {
      padding-left: 16px;
    }
    .cm-header-1,
    .cm-header-2,
    .cm-header-3,
    .cm-header-4,
    .cm-header-5,
    .cm-header-6 {
      font-size: 14px;
      line-height: 22px;
    }
    .cm-quote {
      font-style: normal;
      color: rgba(0,0,0,.48);
    }
    .cm-link:not(.cm-formatting-link):not(.cm-formatting-image) {
      color: #000;
    }
    .cm-url:not(.cm-formatting-link-string) {
      color: #1971c2;
      letter-spacing: normal;
    }
    .cm-comment:not(.cm-formatting-code) {
      box-shadow: 0 0 0 2px rgba(0,0,0,.05);
    }
    .cm-comment.cm-formatting-code {
      background: none;
    }
  }
`

// const highlightCode = code => (
//   <Highlight
//     Prism={Prism}
//     code={code}
//     theme={theme}
//     language='markdown'
//   >
//     {({ tokens, getLineProps, getTokenProps }) => (
//       <Fragment>
//         {tokens.map((line, i) => (
//           <div {...getLineProps({ line, key: i })}>
//             {line.map((token, key) => (
//               <span {...getTokenProps({ token, key })} />
//             ))}
//           </div>
//         ))}
//       </Fragment>
//     )}
//   </Highlight>
// )

export default forwardRef(({ id, type, placeholder, delay = 1000, options/*, value */, ...rest }, ref) => {
  // useState(localStorage.getItem(`smde_${id}`) || value)
  return (
    <StyledEditor
      id={id}
      options={{
        minHeight: `${type === 'mini' ? 30 : 54}px`,
        spellChecker: false,
        autoDownloadFontAwesome: false,
        indentWithTabs: false,
        showIcons: [],
        status: false,
        toolbar: false,
        toolbarTips: false,
        placeholder,
        // autosave: {
        //   enabled: true,
        //   uniqueId: id,
        //   delay
        // },
        ...options
      }}
      {...rest}
    />
  )
})
