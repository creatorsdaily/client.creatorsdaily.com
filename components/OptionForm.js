import { Button, Form, Input } from 'antd'
import Link from 'next/link'
import { useState } from 'react'
import ProductSelect from './ProductSelect'

const { Item } = Form
const { TextArea } = Input

export default (props) => {
  const { showButton = false, product, question, positive, fixed, ...rest } = props
  const [productId, setProductId] = useState(product)
  const handleValuesChange = ({ productId: nValue }) => {
    if (!nValue || nValue === productId) return
    setProductId(nValue)
  }
  const renderReason = () => {
    if (!productId) return null
    return (
      <Item
        name='reason'
      >
        <TextArea placeholder={`${positive ? '推荐' : '反对'}理由`} />
      </Item>
    )
  }
  const renderButton = () => {
    if (productId) return null
    return (
      <Link href='/create'>
        <a>
          <Button size='large' block>没找到？添加新产品</Button>
        </a>
      </Link>
    )
  }
  return (
    <Form {...rest} initialValues={{ productId: product }} onValuesChange={handleValuesChange}>
      <Item
        name='productId'
        rules={[{
          required: true, message: '必须选择一款产品！'
        }]}
      >
        <ProductSelect question={question} fixed={fixed} />
      </Item>
      {renderReason()}
      {showButton && (
        <Item>
          <Button type='primary' block htmlType='submit'>确定</Button>
        </Item>
      )}
      {renderButton()}
    </Form>
  )
}
