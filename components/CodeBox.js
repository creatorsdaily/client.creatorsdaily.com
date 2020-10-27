import React, { useRef } from 'react'
import styled from 'styled-components'
import { Input, Space } from 'antd'
import { useList } from 'react-use'
import isFunction from 'lodash/isFunction'
import removeDefaultBehavior from '../libs/removeDefaultBehavior'
import textSelect from '../libs/textSelect'

const Container = styled.div`
.ant-input {
  width: 40px;
  text-align: center;
}
`

const CodeBox = ({ value, length = 4, onChange }) => {
  const [list, { updateAt }] = useList([])
  const doms = useRef([])
  const boxes = []
  const triggerChange = changed => {
    if (isFunction(onChange)) {
      onChange(changed.map(x => x === '' ? ' ' : x).join('').trim())
    }
  }
  const inputChange = (e, i) => {
    const v = e.target.value.trim()

    if (list[i] !== v && v) {
      focusOn(i + 1)
    }

    const code = list.map(v => v)
    code[i] = v
    updateAt(i, v)
    textSelect(e.target)
    if (v !== '') {
      focusOn(i + 1)
    } else {
      focusOn(i - 1)
    }
    if (code.every(v => v !== '')) {
      e.target.blur()
    }
    triggerChange(code)
  }
  const focusOn = (i) => {
    const element = doms.current[i]
    if (element) {
      element.focus()
    }
  }
  const getPrevBox = i => {
    return doms.current[i - 1]
  }
  const getNextBox = i => {
    return doms.current[i + 1]
  }
  const onKeyDown = (e, i) => {
    const inputElement = e.target
    switch (e.keyCode) {
      case 8: // 删除完之后，退回到上一个输入框
        if (e.target.value === '') {
          // 如果空的话，那么就退回到上一个输入框
          removeDefaultBehavior(e)
          console.log(111111)
          focusOn(i - 1)
        }
        break
      case 37: // 左
      case 38: // 上
        removeDefaultBehavior(e)
        if (getPrevBox(i)) {
          focusOn(i - 1)
        } else {
          focusOn(i)
        }
        break
      case 39: // 右
      case 40: // 下
        removeDefaultBehavior(e)
        if (getNextBox(i)) {
          focusOn(i + 1)
        } else {
          focusOn(i)
        }
        break
      default:
        // 不管你输入什么
        // 都会聚焦文本
        textSelect(inputElement)
    }
  }
  for (let i = 0; i < length; i++) {
    boxes.push(
      <Input
        key={i}
        size='large'
        maxLength={1}
        autoComplete='false'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck={false}
        value={(value && value[i] && value[i].trim()) || list[i]}
        ref={dom => (doms.current[i] = dom)}
        onChange={e => inputChange(e, i)}
        onKeyDown={e => onKeyDown(e, i)}
        onFocus={e => textSelect(e.target)}
        onClick={e => textSelect(e.target)}
      />
    )
  }
  return (
    <Container>
      <Space size='middle' style={{ width: '100%', justifyContent: 'center' }}>
        {boxes}
      </Space>
    </Container>
  )
}

export default CodeBox
